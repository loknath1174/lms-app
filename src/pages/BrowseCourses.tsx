import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import CourseCard, { Course } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BrowseCourses: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(
    JSON.parse(localStorage.getItem('enrolled_courses') || '[]')
  );

  // Mock courses data
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn the basics of React including components, props, state, and hooks. Perfect for beginners.',
      instructor: { name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      duration: '8 hours',
      students: 1250,
      lessons: 24,
      rating: 4.8,
      category: 'Web Development',
      level: 'Beginner',
      price: 49,
      isEnrolled: enrolledCourses.includes('1'),
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      description: 'Master advanced TypeScript concepts including generics, decorators, and advanced types.',
      instructor: { name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      duration: '12 hours',
      students: 890,
      lessons: 32,
      rating: 4.9,
      category: 'Programming',
      level: 'Advanced',
      price: 79,
      isEnrolled: enrolledCourses.includes('2'),
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      description: 'Learn the fundamental principles of user interface and user experience design.',
      instructor: { name: 'Emily Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily' },
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop',
      duration: '10 hours',
      students: 2100,
      lessons: 28,
      rating: 4.7,
      category: 'Design',
      level: 'Intermediate',
      price: 59,
      isEnrolled: enrolledCourses.includes('3'),
    },
    {
      id: '4',
      title: 'Python for Data Science',
      description: 'Comprehensive course on using Python for data analysis, visualization, and machine learning.',
      instructor: { name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
      duration: '15 hours',
      students: 1750,
      lessons: 45,
      rating: 4.6,
      category: 'Data Science',
      level: 'Intermediate',
      price: 89,
      isEnrolled: enrolledCourses.includes('4'),
    },
    {
      id: '5',
      title: 'Mobile App Development with Flutter',
      description: 'Build beautiful cross-platform mobile applications using Flutter and Dart.',
      instructor: { name: 'Jessica Liu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica' },
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      duration: '18 hours',
      students: 950,
      lessons: 38,
      rating: 4.8,
      category: 'Mobile Development',
      level: 'Intermediate',
      price: 99,
      isEnrolled: enrolledCourses.includes('5'),
    },
    {
      id: '6',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing including SEO, social media, and content marketing.',
      instructor: { name: 'Mark Thompson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mark' },
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      duration: '6 hours',
      students: 3200,
      lessons: 18,
      rating: 4.5,
      category: 'Marketing',
      level: 'Beginner',
      price: 39,
      isEnrolled: enrolledCourses.includes('6'),
    },
  ];

  const categories = ['all', 'Web Development', 'Programming', 'Design', 'Data Science', 'Mobile Development', 'Marketing'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter courses
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = (courseId: string) => {
    if (user?.role !== 'student') {
      toast({
        title: "Access Denied",
        description: "Only students can enroll in courses.",
        variant: "destructive",
      });
      return;
    }

    const updatedEnrolledCourses = [...enrolledCourses, courseId];
    setEnrolledCourses(updatedEnrolledCourses);
    localStorage.setItem('enrolled_courses', JSON.stringify(updatedEnrolledCourses));
    
    const course = mockCourses.find(c => c.id === courseId);
    toast({
      title: "Successfully Enrolled!",
      description: `You've been enrolled in "${course?.title}". Start learning now!`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold">Browse Courses</h1>
        <p className="text-muted-foreground">
          Discover new skills and advance your career with our expert-led courses.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map(level => (
              <SelectItem key={level} value={level}>
                {level === 'all' ? 'All Levels' : level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchTerm) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2"
        >
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-destructive">
                ×
              </button>
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-destructive">
                ×
              </button>
            </Badge>
          )}
          {selectedLevel !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedLevel}
              <button onClick={() => setSelectedLevel('all')} className="ml-1 hover:text-destructive">
                ×
              </button>
            </Badge>
          )}
        </motion.div>
      )}

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </p>
      </motion.div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or browse all courses.
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <CourseCard
                course={{
                  ...course,
                  isEnrolled: enrolledCourses.includes(course.id)
                }}
                onEnroll={handleEnroll}
                variant="default"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BrowseCourses;