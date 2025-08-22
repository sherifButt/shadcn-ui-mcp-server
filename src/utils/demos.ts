import { ComponentDemo } from '../types/components.js';

const componentDemos: Record<string, ComponentDemo[]> = {
  button: [
    {
      name: 'Basic Button',
      description: 'A simple button with different variants',
      imports: ['import { Button } from "@/components/ui/button"'],
      code: `<div className="flex gap-4">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`
    },
    {
      name: 'Button with Icon',
      description: 'Button with an icon from lucide-react',
      imports: [
        'import { Button } from "@/components/ui/button"',
        'import { Mail } from "lucide-react"'
      ],
      code: `<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>`
    },
    {
      name: 'Loading Button',
      description: 'Button with loading state',
      imports: [
        'import { Button } from "@/components/ui/button"',
        'import { Loader2 } from "lucide-react"'
      ],
      code: `<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`
    }
  ],
  
  card: [
    {
      name: 'Basic Card',
      description: 'A simple card with header, content, and footer',
      imports: [
        'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"',
        'import { Button } from "@/components/ui/button"'
      ],
      code: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Add your project details here.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`
    },
    {
      name: 'Card with Form',
      description: 'Card containing a form',
      imports: [
        'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"',
        'import { Input } from "@/components/ui/input"',
        'import { Label } from "@/components/ui/label"',
        'import { Button } from "@/components/ui/button"'
      ],
      code: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Account</CardTitle>
    <CardDescription>
      Make changes to your account here. Click save when you're done.
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="space-y-1">
      <Label htmlFor="name">Name</Label>
      <Input id="name" defaultValue="Pedro Duarte" />
    </div>
    <div className="space-y-1">
      <Label htmlFor="username">Username</Label>
      <Input id="username" defaultValue="@peduarte" />
    </div>
  </CardContent>
  <CardFooter>
    <Button>Save changes</Button>
  </CardFooter>
</Card>`
    }
  ],

  input: [
    {
      name: 'Basic Input',
      description: 'Different input types',
      imports: [
        'import { Input } from "@/components/ui/input"',
        'import { Label } from "@/components/ui/label"'
      ],
      code: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`
    },
    {
      name: 'Input with Button',
      description: 'Input field with an action button',
      imports: [
        'import { Input } from "@/components/ui/input"',
        'import { Button } from "@/components/ui/button"'
      ],
      code: `<div className="flex w-full max-w-sm items-center space-x-2">
  <Input type="email" placeholder="Email" />
  <Button type="submit">Subscribe</Button>
</div>`
    },
    {
      name: 'Disabled Input',
      description: 'Disabled input field',
      imports: ['import { Input } from "@/components/ui/input"'],
      code: `<Input disabled type="email" placeholder="Email" />`
    }
  ],

  dialog: [
    {
      name: 'Basic Dialog',
      description: 'A modal dialog with trigger button',
      imports: [
        'import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"',
        'import { Button } from "@/components/ui/button"'
      ],
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <p>Profile form fields go here</p>
    </div>
  </DialogContent>
</Dialog>`
    }
  ],

  select: [
    {
      name: 'Basic Select',
      description: 'A dropdown select component',
      imports: [
        'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"'
      ],
      code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
    <SelectItem value="pineapple">Pineapple</SelectItem>
  </SelectContent>
</Select>`
    }
  ],

  form: [
    {
      name: 'Login Form',
      description: 'Form with validation using react-hook-form and zod',
      imports: [
        'import { zodResolver } from "@hookform/resolvers/zod"',
        'import { useForm } from "react-hook-form"',
        'import * as z from "zod"',
        'import { Button } from "@/components/ui/button"',
        'import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"',
        'import { Input } from "@/components/ui/input"'
      ],
      code: `const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`
    }
  ],

  toast: [
    {
      name: 'Toast Notification',
      description: 'Show toast notifications',
      imports: [
        'import { Button } from "@/components/ui/button"',
        'import { useToast } from "@/components/ui/use-toast"'
      ],
      code: `export function ToastDemo() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}`
    }
  ],

  table: [
    {
      name: 'Basic Table',
      description: 'A simple data table',
      imports: [
        'import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"'
      ],
      code: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV003</TableCell>
      <TableCell>Unpaid</TableCell>
      <TableCell>Bank Transfer</TableCell>
      <TableCell className="text-right">$350.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`
    }
  ],

  tabs: [
    {
      name: 'Basic Tabs',
      description: 'Tab navigation component',
      imports: [
        'import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"',
        'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"'
      ],
      code: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Account settings form goes here</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Password change form goes here</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>`
    }
  ]
};

export function generateComponentDemo(componentName: string, demoIndex: number = 0): ComponentDemo | null {
  const demos = componentDemos[componentName];
  
  if (!demos || demos.length === 0) {
    return generateDefaultDemo(componentName);
  }
  
  if (demoIndex >= demos.length) {
    demoIndex = 0;
  }
  
  return demos[demoIndex];
}

export function getAllDemosForComponent(componentName: string): ComponentDemo[] {
  return componentDemos[componentName] || [generateDefaultDemo(componentName)].filter(Boolean) as ComponentDemo[];
}

function generateDefaultDemo(componentName: string): ComponentDemo | null {
  // Generate a basic demo for components without specific demos
  const componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  return {
    name: `Basic ${componentTitle}`,
    description: `Basic usage of the ${componentName} component`,
    imports: [`import { ${componentTitle} } from "@/components/ui/${componentName}"`],
    code: `<${componentTitle}>
  ${componentTitle} content
</${componentTitle}>`
  };
}

export function formatDemoCode(demo: ComponentDemo): string {
  const imports = demo.imports.join('\n');
  const preview = demo.preview || '';
  
  return `${imports}

export function ${demo.name.replace(/\s+/g, '')}Demo() {
  ${preview}
  
  return (
    ${demo.code.split('\n').map(line => '    ' + line).join('\n').trim()}
  )
}`
}