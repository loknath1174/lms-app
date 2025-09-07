import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Plus, 
  Upload, 
  Video, 
  FileText, 
  Image, 
  Trash2,
  Save,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'pdf' | 'image';
  content: string;
  duration?: string;
}

const CreateCourse: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    price: '',
    thumbnail: '',
  });
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Partial<Lesson>>({
    title: '',
    description: '',
    type: 'video',
    content: '',
    duration: '',
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    'Web Development',
    'Programming',
    'Design',
    'Data Science',
    'Mobile Development',
    'Marketing',
    'Business',
    'Photography',
  ];

  const lessonTypes = [
    { value: 'video', label: 'Video', icon: Video },
    { value: 'text', label: 'Text', icon: FileText },
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'image', label: 'Image', icon: Image },
  ];

  const handleCourseChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleLessonChange = (field: string, value: string) => {
    setCurrentLesson(prev => ({ ...prev, [field]: value }));
  };

  const addLesson = () => {
    if (!currentLesson.title || !currentLesson.content) {
      toast({
        title: "Incomplete Lesson",
        description: "Please fill in the lesson title and content.",
        variant: "destructive",
      });
      return;
    }

    const newLesson: Lesson = {
      id: `lesson_${Date.now()}`,
      title: currentLesson.title!,
      description: currentLesson.description || '',
      type: currentLesson.type as Lesson['type'],
      content: currentLesson.content!,
      duration: currentLesson.duration,
    };

    setLessons(prev => [...prev, newLesson]);
    setCurrentLesson({
      title: '',
      description: '',
      type: 'video',
      content: '',
      duration: '',
    });

    toast({
      title: "Lesson Added",
      description: `"${newLesson.title}" has been added to your course.`,
    });
  };

  const removeLesson = (lessonId: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
    toast({
      title: "Lesson Removed",
      description: "The lesson has been removed from your course.",
    });
  };

  const simulateFileUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCreateCourse = async () => {
    if (!courseData.title || !courseData.description || !courseData.category || lessons.length === 0) {
      toast({
        title: "Incomplete Course",
        description: "Please fill in all course details and add at least one lesson.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    // Simulate course creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store course in localStorage (mock backend)
    const existingCourses = JSON.parse(localStorage.getItem('instructor_courses') || '[]');
    const newCourse = {
      id: `course_${Date.now()}`,
      ...courseData,
      instructor: {
        name: user?.name || 'Unknown',
        avatar: user?.avatar,
      },
      lessons,
      students: 0,
      rating: 0,
      isApproved: false,
      createdAt: new Date().toISOString(),
    };

    existingCourses.push(newCourse);
    localStorage.setItem('instructor_courses', JSON.stringify(existingCourses));

    setIsCreating(false);
    
    // Reset form
    setCourseData({
      title: '',
      description: '',
      category: '',
      level: 'Beginner',
      price: '',
      thumbnail: '',
    });
    setLessons([]);

    toast({
      title: "Course Created Successfully!",
      description: "Your course has been submitted for review and will be available once approved.",
    });
  };

  if (user?.role !== 'instructor') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground">
              Only instructors can create courses.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <p className="text-muted-foreground">
          Share your knowledge and create engaging learning experiences.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Details
              </CardTitle>
              <CardDescription>
                Provide basic information about your course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  placeholder="e.g., Complete React Development Course"
                  value={courseData.title}
                  onChange={(e) => handleCourseChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-description">Description</Label>
                <Textarea
                  id="course-description"
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  value={courseData.description}
                  onChange={(e) => handleCourseChange('description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={courseData.category} onValueChange={(value) => handleCourseChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select value={courseData.level} onValueChange={(value) => handleCourseChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-price">Price ($)</Label>
                <Input
                  id="course-price"
                  type="number"
                  placeholder="49"
                  value={courseData.price}
                  onChange={(e) => handleCourseChange('price', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Course Thumbnail</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <Button variant="outline" onClick={simulateFileUpload}>
                    Upload Image
                  </Button>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-4">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}
                  {uploadProgress === 100 && (
                    <p className="text-sm text-accent mt-2">Upload complete!</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lessons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Add Lesson */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Lesson
              </CardTitle>
              <CardDescription>
                Create lessons with different content types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Lesson Type</Label>
                <Select 
                  value={currentLesson.type} 
                  onValueChange={(value) => handleLessonChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonTypes.map(type => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Lesson Title</Label>
                <Input
                  placeholder="e.g., Introduction to React Hooks"
                  value={currentLesson.title}
                  onChange={(e) => handleLessonChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  placeholder="Brief description of this lesson..."
                  rows={2}
                  value={currentLesson.description}
                  onChange={(e) => handleLessonChange('description', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  {currentLesson.type === 'video' ? 'Video URL' : 
                   currentLesson.type === 'text' ? 'Text Content' : 
                   'File URL'}
                </Label>
                {currentLesson.type === 'text' ? (
                  <Textarea
                    placeholder="Enter your lesson content here..."
                    rows={4}
                    value={currentLesson.content}
                    onChange={(e) => handleLessonChange('content', e.target.value)}
                  />
                ) : (
                  <Input
                    placeholder={
                      currentLesson.type === 'video' ? 'https://youtube.com/watch?v=...' :
                      currentLesson.type === 'pdf' ? 'Upload PDF file' :
                      'Upload image file'
                    }
                    value={currentLesson.content}
                    onChange={(e) => handleLessonChange('content', e.target.value)}
                  />
                )}
              </div>

              {currentLesson.type === 'video' && (
                <div className="space-y-2">
                  <Label>Duration (Optional)</Label>
                  <Input
                    placeholder="e.g., 15 minutes"
                    value={currentLesson.duration}
                    onChange={(e) => handleLessonChange('duration', e.target.value)}
                  />
                </div>
              )}

              <Button onClick={addLesson} className="w-full bg-gradient-primary hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Add Lesson
              </Button>
            </CardContent>
          </Card>

          {/* Lesson List */}
          {lessons.length > 0 && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Course Lessons ({lessons.length})</CardTitle>
                <CardDescription>
                  Review and manage your course lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => {
                    const Icon = lessonTypes.find(t => t.value === lesson.type)?.icon || FileText;
                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xs font-medium bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
                            {index + 1}
                          </span>
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{lesson.title}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {lesson.type}
                              </Badge>
                              {lesson.duration && (
                                <span className="text-xs text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLesson(lesson.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 justify-end"
      >
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button 
          onClick={handleCreateCourse} 
          disabled={isCreating}
          className="bg-gradient-primary hover:opacity-90"
        >
          {isCreating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isCreating ? 'Creating Course...' : 'Create Course'}
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateCourse;