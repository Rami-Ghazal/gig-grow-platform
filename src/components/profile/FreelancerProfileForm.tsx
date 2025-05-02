
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Plus, FileText, X } from 'lucide-react';

export const FreelancerProfileForm = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    hourlyRate: '',
    resumeFile: null as File | null,
  });
  
  const [experiences, setExperiences] = useState([
    { id: '1', title: '', company: '', startDate: '', endDate: '', description: '' }
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeName, setResumeName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addExperience = () => {
    const newId = (experiences.length + 1).toString();
    setExperiences([
      ...experiences, 
      { id: newId, title: '', company: '', startDate: '', endDate: '', description: '' }
    ]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      setFormData(prev => ({ ...prev, resumeFile: file }));
      setResumeName(file.name);
      toast.success('Resume uploaded successfully!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Complete Your Freelancer Profile</CardTitle>
        <CardDescription>
          Add your details to help clients find you for relevant projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell clients about yourself, your expertise, and experience"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              name="skills"
              placeholder="E.g., JavaScript, React, UI Design"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              placeholder="Your hourly rate"
              value={formData.hourlyRate}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resume">Resume/CV (PDF)</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex items-center space-x-2"
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                <FileText className="h-4 w-4" />
                <span>Upload Resume</span>
              </Button>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {resumeName && (
                <span className="text-sm text-muted-foreground">
                  {resumeName}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Work Experience</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addExperience}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
            
            {experiences.map((exp, index) => (
              <Card key={exp.id} className="border border-dashed">
                <CardContent className="pt-6 space-y-4">
                  {experiences.length > 1 && (
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${exp.id}`}>Job Title</Label>
                      <Input
                        id={`title-${exp.id}`}
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                        placeholder="E.g., Frontend Developer"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                        placeholder="E.g., Acme Inc"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${exp.id}`}
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${exp.id}`}>End Date (or "Present")</Label>
                      <Input
                        id={`endDate-${exp.id}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                        placeholder="Leave blank if current"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${exp.id}`}>Description</Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements"
                      rows={3}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
