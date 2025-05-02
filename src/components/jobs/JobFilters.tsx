
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

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

export const JobFilters = ({ onFilterChange }: JobFiltersProps) => {
  const [filters, setFilters] = useState({
    search: '',
    categories: [] as string[],
    budgetRange: [0, 10000],
    skills: [] as string[],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      search: e.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    
    const newFilters = {
      ...filters,
      categories: newCategories,
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBudgetChange = (values: number[]) => {
    const newFilters = {
      ...filters,
      budgetRange: values,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      search: '',
      categories: [],
      budgetRange: [0, 10000],
      skills: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Categories
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {jobCategories.slice(0, 6).map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Budget Range</h3>
              <div className="text-sm">
                ${filters.budgetRange[0]} - ${filters.budgetRange[1]}
              </div>
            </div>
            <Slider
              defaultValue={[0, 10000]}
              max={10000}
              step={100}
              value={filters.budgetRange}
              onValueChange={handleBudgetChange}
              className="my-4"
            />
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
