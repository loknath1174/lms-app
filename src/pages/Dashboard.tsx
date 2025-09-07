import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  Award,
  Target,
  CheckCircle,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  // Mock data based on user role
  const getDashboardData = () => {
    switch (user.role) {
      case 'admin':
        return {
          stats: [
            {
              title: 'Total Users',
              value: '2,847',
              change: '+12%',
              icon: Users,
              trend: 'up',
            },
            {
              title: 'Active Courses',
              value: '156',
              change: '+8%',
              icon: BookOpen,
              trend: 'up',
            },
            {
              title: 'Revenue',
              value: '$45,230',
              change: '+23%',
              icon: TrendingUp,
              trend: 'up',
            },
            {
              title: 'Completion Rate',
              value: '87%',
              change: '+5%',
              icon: Award,
              trend: 'up',
            },
          ],
          recentActivity: [
            'New instructor registration: Dr. Sarah Johnson',
            'Course "Advanced React" approved',
            'Monthly report generated',
            'User feedback received for "Data Science Basics"',
          ],
        };
      case 'instructor':
        return {
          stats: [
            {
              title: 'My Courses',
              value: '8',
              change: '+2',
              icon: BookOpen,
              trend: 'up',
            },
            {
              title: 'Total Students',
              value: '342',
              change: '+15',
              icon: Users,
              trend: 'up',
            },
            {
              title: 'Avg. Rating',
              value: '4.8',
              change: '+0.2',
              icon: Award,
              trend: 'up',
            },
            {
              title: 'Hours Taught',
              value: '156',
              change: '+12',
              icon: Clock,
              trend: 'up',
            },
          ],
          recentActivity: [
            'New student enrolled in "JavaScript Fundamentals"',
            'Course material updated for "React Hooks"',
            'Assignment graded for "Web Development"',
            'Student question answered in "CSS Mastery"',
          ],
        };
      case 'student':
        return {
          stats: [
            {
              title: 'Enrolled Courses',
              value: '5',
              change: '+1',
              icon: BookOpen,
              trend: 'up',
            },
            {
              title: 'Completed',
              value: '3',
              change: '+1',
              icon: CheckCircle,
              trend: 'up',
            },
            {
              title: 'Learning Hours',
              value: '47',
              change: '+8',
              icon: Clock,
              trend: 'up',
            },
            {
              title: 'Certificates',
              value: '2',
              change: '+1',
              icon: Award,
              trend: 'up',
            },
          ],
          recentActivity: [
            'Completed lesson: "Introduction to Hooks"',
            'New course enrolled: "Advanced TypeScript"',
            'Assignment submitted for "React Fundamentals"',
            'Certificate earned for "JavaScript Basics"',
          ],
        };
      default:
        return { stats: [], recentActivity: [] };
    }
  };

  const { stats, recentActivity } = getDashboardData();

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold">
          Welcome back, {user.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your {user.role} account today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Badge 
                      variant="secondary" 
                      className={`${
                        stat.trend === 'up' 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-destructive text-destructive-foreground'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                    <span>from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks for your role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.role === 'admin' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Review pending courses</span>
                    <Badge>3 pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>User management</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </>
              )}
              
              {user.role === 'instructor' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Create new course</span>
                    <Badge className="bg-gradient-primary text-white">Start</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Grade assignments</span>
                    <Badge>5 pending</Badge>
                  </div>
                </>
              )}
              
              {user.role === 'student' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Continue learning</span>
                    <Badge className="bg-gradient-primary text-white">Resume</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Browse new courses</span>
                    <Badge variant="outline">Explore</Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {activity}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Progress Section for Students */}
      {user.role === 'student' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Current Progress</CardTitle>
              <CardDescription>
                Your learning journey across enrolled courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { course: 'React Fundamentals', progress: 75 },
                { course: 'JavaScript Advanced', progress: 45 },
                { course: 'TypeScript Basics', progress: 90 },
              ].map((item, index) => (
                <motion.div
                  key={item.course}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.course}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.progress}%
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;