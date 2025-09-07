import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Users, 
  BookOpen, 
  Star,
  Play,
  UserPlus,
  CheckCircle,
  Trash2,
  Edit
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  thumbnail?: string;
  duration: string;
  students: number;
  lessons: number;
  rating: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price?: number;
  isEnrolled?: boolean;
  progress?: number;
  isApproved?: boolean;
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onDelete?: (courseId: string) => void;
  onEdit?: (courseId: string) => void;
  onApprove?: (courseId: string) => void;
  variant?: 'default' | 'enrolled' | 'manage';
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  onDelete,
  onEdit,
  onApprove,
  variant = 'default'
}) => {
  const { user } = useAuth();

  const handleEnrollClick = () => {
    if (onEnroll && !course.isEnrolled) {
      onEnroll(course.id);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-accent text-accent-foreground';
      case 'Intermediate':
        return 'bg-primary text-primary-foreground';
      case 'Advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full shadow-card hover:shadow-glow transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
        {/* Course Image */}
        <div className="relative h-48 bg-gradient-primary">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-white/70" />
            </div>
          )}
          
          {/* Status Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className={getLevelColor(course.level)}>
              {course.level}
            </Badge>
            {variant === 'manage' && !course.isApproved && (
              <Badge variant="secondary">Pending</Badge>
            )}
            {course.isEnrolled && (
              <Badge className="bg-accent text-accent-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Enrolled
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2 mb-1">
                {course.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2 mt-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={course.instructor.avatar} />
              <AvatarFallback className="text-xs bg-gradient-primary text-white">
                {course.instructor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {course.instructor.name}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Progress Bar for Enrolled Courses */}
          {course.isEnrolled && course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          {/* Course Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons} lessons</span>
            </div>
          </div>

          {/* Category Badge */}
          <Badge variant="outline" className="mb-4">
            {course.category}
          </Badge>

          {/* Actions */}
          <div className="flex gap-2">
            {/* Student Actions */}
            {user?.role === 'student' && variant === 'default' && (
              <Button
                onClick={handleEnrollClick}
                disabled={course.isEnrolled}
                className={`flex-1 ${
                  course.isEnrolled
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-gradient-primary hover:opacity-90'
                }`}
              >
                {course.isEnrolled ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Continue
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Enroll Now
                  </>
                )}
              </Button>
            )}

            {/* Instructor Actions */}
            {user?.role === 'instructor' && variant === 'manage' && (
              <>
                <Button variant="outline" onClick={() => onEdit?.(course.id)} className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete?.(course.id)}
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Admin Actions */}
            {user?.role === 'admin' && variant === 'manage' && (
              <>
                {!course.isApproved && (
                  <Button
                    onClick={() => onApprove?.(course.id)}
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => onDelete?.(course.id)}
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* View Course for Enrolled */}
            {variant === 'enrolled' && (
              <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                <Play className="mr-2 h-4 w-4" />
                Continue Learning
              </Button>
            )}
          </div>

          {/* Price */}
          {course.price && variant === 'default' && !course.isEnrolled && (
            <div className="mt-4 text-right">
              <span className="text-2xl font-bold text-primary">
                ${course.price}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCard;