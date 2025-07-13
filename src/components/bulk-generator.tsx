import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Upload, CheckCircle, AlertCircle, X, FileText, Database, Settings, BarChart3, Crown, Palette, Layers, RefreshCw, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import JSZip from "jszip";

interface BulkQRData {
  id: string;
  url: string;
  name?: string;
  category?: string;
  customFilename?: string;
}

interface BulkQRResult extends BulkQRData {
  success: boolean;
  error?: string;
  dataURL?: string;
  filename: string;
}

interface BusinessSettings {
  addLogo: boolean;
  logoFile?: File;
  foregroundColor: string;
  backgroundColor: string;
  margin: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  addBranding: boolean;
  brandingText: string;
}

export default function BulkGenerator() {
  const [activeTab, setActiveTab] = useState("input");
  const [inputMethod, setInputMethod] = useState<"manual" | "csv">("manual");
  const [urls, setUrls] = useState("");
  const [csvData, setCsvData] = useState<BulkQRData[]>([]);
  const [size, setSize] = useState("400");
  const [format, setFormat] = useState("png");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BulkQRResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    addLogo: false,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    margin: 4,
    errorCorrection: 'M',
    addBranding: false,
    brandingText: ""
  });
  const [analytics, setAnalytics] = useState({
    totalGenerated: 0,
    successRate: 0,
    avgProcessingTime: 0,
    categoriesCount: {} as Record<string, number>
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const isValidURL = (string: string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const parseCSV = (csvText: string): BulkQRData[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const urlIndex = headers.findIndex(h => h.includes('url') || h.includes('link'));
    const nameIndex = headers.findIndex(h => h.includes('name') || h.includes('title'));
    const categoryIndex = headers.findIndex(h => h.includes('category') || h.includes('type'));
    const filenameIndex = headers.findIndex(h => h.includes('filename') || h.includes('file'));
    
    if (urlIndex === -1) {
      throw new Error('CSV must contain a URL column');
    }
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      return {
        id: `csv-${index}`,
        url: values[urlIndex] || '',
        name: nameIndex !== -1 ? values[nameIndex] : undefined,
        category: categoryIndex !== -1 ? values[categoryIndex] : undefined,
        customFilename: filenameIndex !== -1 ? values[filenameIndex] : undefined
      };
    }).filter(item => item.url);
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const data = parseCSV(csvText);
        setCsvData(data);
        setInputMethod("csv");
        toast({
          title: "Success",
          description: `Loaded ${data.length} URLs from CSV`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to parse CSV",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const downloadCSVTemplate = () => {
    const template = `url,name,category,filename
https://example.com,Example Website,Marketing,example_qr
https://mystore.com/product1,Product 1,Product,product1_qr
https://event.com/register,Event Registration,Event,event_qr`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr_bulk_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateBulkQRCodes = async () => {
    let dataToProcess: BulkQRData[] = [];
    
    if (inputMethod === "csv") {
      dataToProcess = csvData;
    } else {
      const urlList = urls.split('\n').map(url => url.trim()).filter(url => url.length > 0);
      dataToProcess = urlList.map((url, index) => ({
        id: `manual-${index}`,
        url,
        name: `QR Code ${index + 1}`,
        category: 'Manual'
      }));
    }
    
    if (dataToProcess.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one URL or upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    if (dataToProcess.length > 1000) {
      toast({
        title: "Error", 
        description: "Maximum 1000 URLs allowed for bulk generation",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setActiveTab("progress");
    const newResults: BulkQRResult[] = [];
    const startTime = Date.now();
    let successCount = 0;
    const categoryCounts: Record<string, number> = {};

    for (let i = 0; i < dataToProcess.length; i++) {
      const item = dataToProcess[i];
      
      try {
        if (!isValidURL(item.url)) {
          newResults.push({
            ...item,
            success: false,
            error: "Invalid URL format",
            filename: `${item.customFilename || item.name || `qr_${i + 1}`}_error.txt`
          });
        } else {
          const qrOptions = {
            width: parseInt(size),
            margin: businessSettings.margin,
            color: {
              dark: businessSettings.foregroundColor,
              light: businessSettings.backgroundColor
            },
            errorCorrectionLevel: businessSettings.errorCorrection
          };
          
          const dataURL = await QRCode.toDataURL(item.url, qrOptions);
          const filename = `${item.customFilename || item.name?.replace(/[^a-zA-Z0-9]/g, '_') || `qr_${i + 1}`}.${format}`;
          
          newResults.push({
            ...item,
            success: true,
            dataURL,
            filename
          });
          
          successCount++;
          
          // Count categories
          const category = item.category || 'Uncategorized';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      } catch (error) {
        newResults.push({
          ...item,
          success: false,
          error: "Generation failed",
          filename: `${item.customFilename || item.name || `qr_${i + 1}`}_error.txt`
        });
      }

      setProgress(((i + 1) / dataToProcess.length) * 100);
      setResults([...newResults]);
    }

    const endTime = Date.now();
    const avgProcessingTime = (endTime - startTime) / dataToProcess.length;
    
    // Update analytics
    setAnalytics({
      totalGenerated: dataToProcess.length,
      successRate: (successCount / dataToProcess.length) * 100,
      avgProcessingTime,
      categoriesCount: categoryCounts
    });

    setIsGenerating(false);
    setShowResults(true);
    setActiveTab("results");
    
    toast({
      title: "Bulk Generation Complete",
      description: `Successfully generated ${successCount} out of ${dataToProcess.length} QR codes`,
    });
  };

  const downloadAll = async () => {
    const successfulResults = results.filter(r => r.success && r.dataURL);
    
    if (successfulResults.length === 0) {
      toast({
        title: "Error",
        description: "No QR codes to download",
        variant: "destructive"
      });
      return;
    }

    const zip = new JSZip();
    
    // Add QR codes to zip
    for (const result of successfulResults) {
      if (result.dataURL) {
        const base64Data = result.dataURL.split(',')[1];
        zip.file(result.filename, base64Data, { base64: true });
      }
    }
    
    // Add analytics report
    const analyticsReport = `QR Code Bulk Generation Report
Generated: ${new Date().toLocaleString()}
Total URLs: ${analytics.totalGenerated}
Successful: ${successfulResults.length}
Success Rate: ${analytics.successRate.toFixed(1)}%
Average Processing Time: ${analytics.avgProcessingTime.toFixed(0)}ms per code

Categories:
${Object.entries(analytics.categoriesCount).map(([cat, count]) => `- ${cat}: ${count}`).join('\n')}

Generated Files:
${successfulResults.map(r => `- ${r.filename} (${r.name || r.url})`).join('\n')}
`;
    
    zip.file("generation_report.txt", analyticsReport);
    
    // Generate and download zip
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr_codes_bulk_${new Date().toISOString().split('T')[0]}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete",
      description: `Downloaded ${successfulResults.length} QR codes with analytics report`,
    });
  };

  const resetGenerator = () => {
    setUrls("");
    setCsvData([]);
    setResults([]);
    setShowResults(false);
    setProgress(0);
    setActiveTab("input");
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="input" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Data Input
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Business Settings
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            Generation
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Results & Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Data Input Methods
            </h3>
            
            <div className="flex gap-4 mb-6">
              <Button
                variant={inputMethod === "manual" ? "default" : "outline"}
                onClick={() => setInputMethod("manual")}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Manual Entry
              </Button>
              <Button
                variant={inputMethod === "csv" ? "default" : "outline"}
                onClick={() => setInputMethod("csv")}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                CSV Import
              </Button>
            </div>

            {inputMethod === "manual" ? (
              <div className="space-y-4">
                <Label htmlFor="bulk-urls" className="text-sm font-medium">
                  URLs (one per line)
                </Label>
                <Textarea
                  id="bulk-urls"
                  rows={12}
                  placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  disabled={isGenerating}
                  className="w-full font-mono text-sm"
                />
                <p className="text-xs text-neutral-500">
                  {urls.split('\n').filter(url => url.trim().length > 0).length} URLs entered (max 1000)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">CSV File Upload</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadCSVTemplate}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Template
                  </Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-2"
                  >
                    Upload CSV File
                  </Button>
                  <p className="text-sm text-neutral-500">
                    CSV should contain columns: url, name, category, filename
                  </p>
                </div>
                
                {csvData.length > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      CSV Data Loaded Successfully
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      {csvData.length} URLs loaded from CSV file
                    </p>
                    <div className="mt-2 max-h-32 overflow-y-auto">
                      {csvData.slice(0, 5).map((item, index) => (
                        <div key={index} className="text-xs text-green-600 dark:text-green-300">
                          {item.name || `Item ${index + 1}`}: {item.url}
                        </div>
                      ))}
                      {csvData.length > 5 && (
                        <div className="text-xs text-green-600 dark:text-green-300">
                          ... and {csvData.length - 5} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Business Branding & Customization
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">QR Code Settings</Label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="size" className="text-sm">Size (pixels)</Label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="200">200x200</SelectItem>
                            <SelectItem value="400">400x400</SelectItem>
                            <SelectItem value="600">600x600</SelectItem>
                            <SelectItem value="800">800x800</SelectItem>
                            <SelectItem value="1000">1000x1000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="format" className="text-sm">Format</Label>
                        <Select value={format} onValueChange={setFormat}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="svg">SVG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Error Correction Level</Label>
                      <Select
                        value={businessSettings.errorCorrection}
                        onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => 
                          setBusinessSettings(prev => ({...prev, errorCorrection: value}))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Low (7%)</SelectItem>
                          <SelectItem value="M">Medium (15%)</SelectItem>
                          <SelectItem value="Q">Quartile (25%)</SelectItem>
                          <SelectItem value="H">High (30%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-3 block">Colors</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fg-color" className="text-sm">Foreground</Label>
                      <Input
                        id="fg-color"
                        type="color"
                        value={businessSettings.foregroundColor}
                        onChange={(e) => setBusinessSettings(prev => ({...prev, foregroundColor: e.target.value}))}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bg-color" className="text-sm">Background</Label>
                      <Input
                        id="bg-color"
                        type="color"
                        value={businessSettings.backgroundColor}
                        onChange={(e) => setBusinessSettings(prev => ({...prev, backgroundColor: e.target.value}))}
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-primary" />
                    <span className="font-medium text-primary">Premium Features</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Custom Logo</Label>
                        <p className="text-xs text-neutral-500">Add your company logo to QR codes</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={businessSettings.addLogo}
                          onCheckedChange={(checked) => 
                            setBusinessSettings(prev => ({...prev, addLogo: checked}))
                          }
                          disabled
                        />
                        <Badge variant="secondary">Pro</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Custom Branding</Label>
                        <p className="text-xs text-neutral-500">Add text below QR codes</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={businessSettings.addBranding}
                          onCheckedChange={(checked) => 
                            setBusinessSettings(prev => ({...prev, addBranding: checked}))
                          }
                          disabled
                        />
                        <Badge variant="secondary">Pro</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    Upgrade to Pro
                  </Button>
                </div>
                
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <h4 className="font-medium mb-2">QR Code Preview</h4>
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-neutral-500">Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Generation Progress
            </h3>
            
            {!isGenerating && results.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Ready to Generate
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  Configure your settings and click generate to start creating QR codes
                </p>
                <Button
                  onClick={generateBulkQRCodes}
                  disabled={isGenerating || (inputMethod === "manual" && urls.trim().length === 0) || (inputMethod === "csv" && csvData.length === 0)}
                  className="bg-primary text-white hover:bg-blue-600"
                >
                  Start Bulk Generation
                </Button>
              </div>
            )}
            
            {isGenerating && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Processing QR codes...</span>
                  <span className="text-sm text-neutral-500">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-neutral-500 text-center">
                  This may take a few moments depending on the number of URLs
                </p>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results.length > 0 && (
            <>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Generation Results
                  </h3>
                  <div className="flex gap-2">
                    <Button onClick={downloadAll} className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download All ({results.filter(r => r.success).length})
                    </Button>
                    <Button variant="outline" onClick={resetGenerator}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 dark:text-green-300">Success Rate</p>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                          {analytics.successRate.toFixed(1)}%
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 dark:text-blue-300">Total Generated</p>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                          {results.filter(r => r.success).length}
                        </p>
                      </div>
                      <Layers className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600 dark:text-purple-300">Avg. Time</p>
                        <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                          {analytics.avgProcessingTime.toFixed(0)}ms
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                      <tr>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">URL</th>
                        <th className="text-left p-3">Category</th>
                        <th className="text-left p-3">Filename</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-t border-neutral-200 dark:border-neutral-700">
                          <td className="p-3">
                            {result.success ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                          </td>
                          <td className="p-3">{result.name || `QR ${index + 1}`}</td>
                          <td className="p-3 max-w-xs truncate" title={result.url}>
                            {result.url}
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{result.category || 'Uncategorized'}</Badge>
                          </td>
                          <td className="p-3 font-mono text-xs">{result.filename}</td>
                          <td className="p-3">
                            {result.success && result.dataURL ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.download = result.filename;
                                  link.href = result.dataURL!;
                                  link.click();
                                }}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            ) : (
                              <span className="text-red-500 text-xs">{result.error}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {Object.keys(analytics.categoriesCount).length > 0 && (
                <Card className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Category Breakdown
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(analytics.categoriesCount).map(([category, count]) => (
                      <div key={category} className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{category}</p>
                        <p className="text-2xl font-bold text-primary">{count}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}