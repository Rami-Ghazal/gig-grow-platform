
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Job categories
const jobCategories = [
  "Web Development",
  "Mobile Development",
  "Design",
  "Writing",
  "Marketing",
  "Video & Animation",
  "Admin Support",
  "Customer Service",
  "Sales",
  "Other"
];

export const JobPostForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budgetMin: '',
    budgetMax: '',
    skills: '',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Job posted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Post a New Job</CardTitle>
        <CardDescription>
          Fill in the details below to post your job and find the perfect freelancer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="E.g., Website Development for E-commerce Store"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the job in detail, including requirements and deliverables"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('category', value)} 
                value={formData.category}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {jobCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetMin">Budget Minimum ($)</Label>
              <Input
                id="budgetMin"
                name="budgetMin"
                type="number"
                placeholder="Minimum budget"
                value={formData.budgetMin}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budgetMax">Budget Maximum ($)</Label>
              <Input
                id="budgetMax"
                name="budgetMax"
                type="number"
                placeholder="Maximum budget"
                value={formData.budgetMax}
                onChange={handleChange}
                min={formData.budgetMin || "1"}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills (comma separated)</Label>
            <Input
              id="skills"
              name="skills"
              placeholder="E.g., JavaScript, React, Node.js"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
