import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Users, BookOpen, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    const success = await login(email, password, selectedRole);
    
    if (!success) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const roleOptions = [
    {
      value: 'student' as UserRole,
      label: 'Student',
      icon: GraduationCap,
      description: 'Access courses and learn',
      demo: { email: 'student@lms.com', password: 'password' }
    },
    {
      value: 'instructor' as UserRole,
      label: 'Instructor',
      icon: BookOpen,
      description: 'Create and manage courses',
      demo: { email: 'instructor@lms.com', password: 'password' }
    },
    {
      value: 'admin' as UserRole,
      label: 'Admin',
      icon: Users,
      description: 'Manage platform and users',
      demo: { email: 'admin@lms.com', password: 'password' }
    },
  ];

  const fillDemoCredentials = (role: UserRole) => {
    const roleData = roleOptions.find(r => r.value === role);
    if (roleData) {
      setEmail(roleData.demo.email);
      setPassword(roleData.demo.password);
      setSelectedRole(role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LearnHub LMS
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Select your role and sign in to continue
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  return (
                    <TabsTrigger
                      key={role.value}
                      value={role.value}
                      className="flex flex-col gap-1 h-16"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{role.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {roleOptions.map((role) => (
                <TabsContent key={role.value} value={role.value} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center mb-4"
                  >
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          `Sign in as ${role.label}`
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => fillDemoCredentials(role.value)}
                      >
                        Use Demo Credentials
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-6 text-sm text-white/70"
        >
          Demo app - Use any email/password combination
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;