
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface JobApplicationFormProps {
  job: Job;
}

export const JobApplicationForm = ({ job }: JobApplicationFormProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedAmount: job.budget.min.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Apply for "{job.title}"</CardTitle>
        <CardDescription>
          Submit your proposal to work on this project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Introduce yourself and explain why you're perfect for this job"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={8}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proposedAmount">Your Bid ($)</Label>
            <Input
              id="proposedAmount"
              name="proposedAmount"
              type="number"
              placeholder="Your bid amount"
              value={formData.proposedAmount}
              onChange={handleChange}
              min={job.budget.min}
              max={job.budget.max}
              required
            />
            <p className="text-sm text-muted-foreground">
              Client's budget: ${job.budget.min} - ${job.budget.max}
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
