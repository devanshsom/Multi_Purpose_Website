import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Star, Trash2, Edit2, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium' as const,
    dueDate: ''
  });

  const categories = [
    { value: 'personal', label: 'Personal', color: 'bg-blue-500' },
    { value: 'work', label: 'Work', color: 'bg-green-500' },
    { value: 'shopping', label: 'Shopping', color: 'bg-purple-500' },
    { value: 'health', label: 'Health', color: 'bg-red-500' },
    { value: 'learning', label: 'Learning', color: 'bg-yellow-500' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-500' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
    { value: 'high', label: 'High', color: 'text-red-500' }
  ];

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('devansh-som-tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        setTasks(parsed.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        })));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('devansh-som-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive"
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      completed: false,
      createdAt: new Date(),
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined
    };

    setTasks([task, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      category: 'personal',
      priority: 'medium',
      dueDate: ''
    });
    setIsAddingTask(false);
    
    toast({
      title: "Success",
      description: "Task added successfully"
    });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Success",
      description: "Task deleted successfully"
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesCompleted = showCompleted || !task.completed;

    return matchesSearch && matchesCategory && matchesPriority && matchesCompleted;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && t.dueDate && t.dueDate < new Date()).length
  };

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Task Manager</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A powerful productivity tool with local storage persistence. Organize your tasks, 
            set priorities, and track your progress efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tasks', value: stats.total, color: 'text-primary' },
            { label: 'Completed', value: stats.completed, color: 'text-green-500' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-500' },
            { label: 'Overdue', value: stats.overdue, color: 'text-red-500' }
          ].map((stat, index) => (
            <Card key={index} className="glass">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <Card className="glass mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    {priorities.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant={showCompleted ? "default" : "outline"}
                  onClick={() => setShowCompleted(!showCompleted)}
                  size="sm"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showCompleted ? 'Hide' : 'Show'} Completed
                </Button>

                <Button
                  onClick={() => setIsAddingTask(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Task Form */}
        {isAddingTask && (
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
              <Textarea
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <div className="flex gap-4">
                <Select value={newTask.category} onValueChange={(value) => setNewTask({...newTask, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({...newTask, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addTask} className="bg-gradient-primary hover:opacity-90">
                  <Check className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground text-lg">
                  {tasks.length === 0 ? 'No tasks yet. Add your first task to get started!' : 'No tasks match your current filters.'}
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className={`glass interactive-card ${task.completed ? 'opacity-75' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 ${task.completed ? 'text-green-500' : 'text-muted-foreground'}`}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <Badge variant="secondary" className={categories.find(c => c.value === task.category)?.color}>
                            {categories.find(c => c.value === task.category)?.label}
                          </Badge>
                          <Star className={`w-4 h-4 ${priorities.find(p => p.value === task.priority)?.color}`} />
                          {task.dueDate && (
                            <Badge variant={task.dueDate < new Date() ? "destructive" : "outline"} className="text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              {task.dueDate.toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                        {task.description && (
                          <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                            {task.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Created: {task.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTask(task.id)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoApp;