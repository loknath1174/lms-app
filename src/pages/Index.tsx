import { motion } from 'framer-motion';
import {import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, BarChart3, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Multi-Role Access',
      description: 'Admin, Instructor, and Student portals with role-based features',
      action: () => navigate('/login')
    },
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Create, manage, and deliver engaging educational content',
      action: () => navigate('/login')
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor learning progress and performance analytics',
      action: () => navigate('/login')
    },
    {
      icon: GraduationCap,
      title: 'Interactive Learning',
      description: 'Rich multimedia lessons with videos, PDFs, and assessments',
      action: () => navigate('/login')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">LearnHub</h1>
          </div>
          <Button 
            onClick={() => navigate('/login')} 
            className="bg-gradient-primary hover:opacity-90"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Modern Learning
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Management System
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empower education with our comprehensive LMS platform. Create courses, manage students, 
            and track progress with beautiful, intuitive interfaces designed for modern learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6"
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')} 
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={feature.action}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-card/50 to-muted/20 rounded-2xl p-12 backdrop-blur-sm border border-border/50"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educators and learners who are already using LearnHub to create 
            engaging educational experiences. Choose your role and get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90"
            >
              Login as Student
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90"
            >
              Login as Instructor
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90"
            >
              Login as Admin
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
 useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, BarChart3, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Multi-Role Access',
      description: 'Admin, Instructor, and Student portals with role-based features',
      action: () => navigate('/login')
    },
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Create, manage, and deliver engaging educational content',
      action: () => navigate('/login')
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor learning progress and performance analytics',
      action: () => navigate('/login')
    },
    {
      icon: GraduationCap,
      title: 'Interactive Learning',
      description: 'Rich multimedia lessons with videos, PDFs, and assessments',
      action: () => navigate('/login')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">LearnHub</h1>
          </div>
          <Button 
            onClick={() => navigate('/login')} 
            className="bg-gradient-primary hover:opacity-90"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Modern Learning
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Management System
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empower education with our comprehensive LMS platform. Create courses, manage students, 
            and track progress with beautiful, intuitive interfaces designed for modern learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6"
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')} 
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={feature.action}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-card/50 to-muted/20 rounded-2xl p-12 backdrop-blur-sm border border-border/50"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educators and learners who are already using LearnHub to create 
            engaging educational experiences. Choose your role and get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90"
            >
              Login as Student
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90"
            >
              Login as Instructor
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-primary hover:opacity-90"
            >
              Login as Admin
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
