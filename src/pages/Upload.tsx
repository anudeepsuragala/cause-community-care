
import React, { useState, useEffect } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';

const UploadPage = () => {
  const [selectedTab, setSelectedTab] = useState('ngo');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    title: '',
    description: '',
    cause: '',
    attachments: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileDropActive, setFileDropActive] = useState(false);

  useEffect(() => {
    document.title = 'Social Cause - Upload Action Hub';
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...filesArray],
      }));
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFileDropActive(false);
    
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...filesArray],
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setFileDropActive(true);
  };

  const handleDragLeave = () => {
    setFileDropActive(false);
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your content has been submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        title: '',
        description: '',
        cause: '',
        attachments: [],
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-3">
            Upload Action Hub
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Share Your Cause</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A platform for NGOs, activists, and changemakers to upload content, share stories, and connect with our community.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="ngo" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="ngo">For NGOs & Organizations</TabsTrigger>
              <TabsTrigger value="individual">For Individual Activists</TabsTrigger>
            </TabsList>
            
            <div className="card-glass">
              <TabsContent value="ngo" className="m-0">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Upload Content as an Organization
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Share your organization's stories, campaign updates, and resources with our community.
                  </p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Contact Person
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium mb-1">
                          Organization Name
                        </label>
                        <input
                          id="organization"
                          name="organization"
                          type="text"
                          required
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                          Post Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cause" className="block text-sm font-medium mb-1">
                          Related Cause
                        </label>
                        <select
                          id="cause"
                          name="cause"
                          required
                          value={formData.cause}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select a cause</option>
                          <option value="drugs">Youth Drug Prevention</option>
                          <option value="women">Women's Health & Safety</option>
                          <option value="tribal">Tribal Welfare & Education</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          required
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      
                      <div>
                        <p className="block text-sm font-medium mb-1">
                          Attachments
                        </p>
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                            fileDropActive
                              ? 'border-primary bg-primary/5'
                              : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                          }`}
                          onDrop={handleFileDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm mb-1">
                            Drag and drop files here or{' '}
                            <label className="text-primary hover:underline cursor-pointer">
                              browse
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </label>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Accepted file types: Images, PDFs, Word docs (Max 10MB each)
                          </p>
                        </div>
                        
                        {formData.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {formData.attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted rounded-md p-2 text-sm">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="truncate max-w-[240px]">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="button-primary w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Content
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="individual" className="m-0">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Upload Content as an Individual
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Share your personal stories, experiences, and ideas related to our social causes.
                  </p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="ind-name" className="block text-sm font-medium mb-1">
                            Your Name
                          </label>
                          <input
                            id="ind-name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                        <div>
                          <label htmlFor="ind-email" className="block text-sm font-medium mb-1">
                            Email Address
                          </label>
                          <input
                            id="ind-email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="ind-title" className="block text-sm font-medium mb-1">
                          Post Title
                        </label>
                        <input
                          id="ind-title"
                          name="title"
                          type="text"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="ind-cause" className="block text-sm font-medium mb-1">
                          Related Cause
                        </label>
                        <select
                          id="ind-cause"
                          name="cause"
                          required
                          value={formData.cause}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select a cause</option>
                          <option value="drugs">Youth Drug Prevention</option>
                          <option value="women">Women's Health & Safety</option>
                          <option value="tribal">Tribal Welfare & Education</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="ind-description" className="block text-sm font-medium mb-1">
                          Your Story or Message
                        </label>
                        <textarea
                          id="ind-description"
                          name="description"
                          rows={4}
                          required
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      
                      <div>
                        <p className="block text-sm font-medium mb-1">
                          Attachments (Optional)
                        </p>
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                            fileDropActive
                              ? 'border-primary bg-primary/5'
                              : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                          }`}
                          onDrop={handleFileDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm mb-1">
                            Drag and drop files here or{' '}
                            <label className="text-primary hover:underline cursor-pointer">
                              browse
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </label>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Accepted file types: Images, PDFs, Word docs (Max 10MB each)
                          </p>
                        </div>
                        
                        {formData.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {formData.attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted rounded-md p-2 text-sm">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="truncate max-w-[240px]">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="button-primary w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Content
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="mt-8 p-6 bg-muted rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">Content Guidelines</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All content shared on our platform is reviewed before publishing. We prioritize 
              authentic stories, educational resources, and constructive discussions. Please ensure your 
              content aligns with our community standards and mission.
            </p>
            <p className="text-xs text-muted-foreground">
              For any questions about content guidelines or the review process, please contact 
              <a href="mailto:content@socialcause.org" className="text-primary ml-1 hover:underline">content@socialcause.org</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
