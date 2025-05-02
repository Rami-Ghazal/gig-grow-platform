
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const postedDate = new Date(job.createdAt);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });
  
  return (
    <Card className="hover-card-effect card-gradient overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mb-2">
            <Link to={`/jobs/${job.id}`} className="hover:text-primary">
              {job.title}
            </Link>
          </h3>
          <Badge>{job.category}</Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {job.skills.slice(0, 5).map((skill, index) => (
            <span key={index} className="category-badge">
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span className="category-badge">+{job.skills.length - 5} more</span>
          )}
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-semibold text-primary-foreground bg-primary px-2 py-1 rounded-full text-xs">
            ${job.budget.min} - ${job.budget.max}
          </span>
          <span>Posted {timeAgo}</span>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-3">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Deadline:</span> {new Date(job.deadline).toLocaleDateString()}
          </p>
          <Button size="sm" asChild>
            <Link to={`/jobs/${job.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
