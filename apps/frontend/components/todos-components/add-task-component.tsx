'use client';
import { Button } from '../ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CalendarIcon, Text } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { CardFooter } from '../ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  useCreateTask,
  useGetLabels,
  useGetProjects,
} from '@/resources/hooks/todo.hooks';
import { useCallback, useMemo } from 'react';
import labelsRecord from '@/resources/utils/labels-record';
import { getProjectName } from '@/resources/utils/projects-record';
import { ICreateTaskDto } from '@/resources/interfaces/create-task-dto.interface';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const createTaskFormSchema = z.object({
  taskName: z.string().min(2, {
    message: 'Task name must be at least 2 characters.',
  }),
  description: z.string().optional().default(''),
  dueDate: z.date({ required_error: 'A due date is required' }),
  priority: z.string().min(1, { message: 'Please select a priority' }),
  projectId: z.number().min(1, { message: 'Please select a Project' }),
  labelId: z.number().optional().nullable(),
});

const defaultValues = {
  taskName: '',
  description: '',
  dueDate: new Date(),
  priority: '4',
  projectId: 1,
  labelId: null,
};

export default function AddTaskComponent({
  setShowAddTask,
  parentId,
  projectId: userProjectId,
}: {
  setShowAddTask: (value: boolean) => void;
  parentId?: number;
  projectId?: number;
}) {
  const form = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      taskName: '',
      description: '',
      dueDate: new Date(),
      priority: '4',
      projectId: userProjectId ? userProjectId : 1,
      labelId: null,
    },
  });

  const { toast } = useToast();

  const { data: projectsData } = useGetProjects();

  const { data: labelsData } = useGetLabels();

  const createTask = useCreateTask();

  const queryClient = useQueryClient();

  const labelsOptions = useMemo(() => {
    return labelsData?.map((label) => ({
      name: labelsRecord[label.name],
      id: label.id.toString(),
    }));
  }, [labelsData]);

  const projectOptions = useMemo(() => {
    return projectsData?.map((project) => ({
      name: getProjectName(project.name),
      id: project.id.toString(),
    }));
  }, [projectsData]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof createTaskFormSchema>) => {
      const createTaskDto: ICreateTaskDto = {
        projectId: data.projectId,
        taskName: data.taskName,
        description: data.description,
        dueDate: new Date().toISOString(),
        priority: data.priority,
        labelId: data.labelId ?? null,
        parentId: parentId ?? null,
      };

      await createTask.mutateAsync(createTaskDto).then(async () => {
        setShowAddTask(false);
        await queryClient.invalidateQueries({
          queryKey: ['get-incomplete-todos'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['get-today-todos'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['get-incomplete-todos-by-project'],
        });
        toast({
          title: `Tarefa adicionada`,
          duration: 3000,
        });

        form.reset({ ...defaultValues });
      });
    },
    [createTask, queryClient, setShowAddTask, form, toast, parentId]
  );

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 border-2 p-2 border-gray-200 my-2 rounded-xl px-3 pt-4 border-foreground/20"
        >
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="taskName"
                    type="text"
                    placeholder="Nome da tarefa"
                    required
                    className="border-0 font-bold text-lg"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start gap-2">
                    <Text className="ml-auto h-4 w-4 opacity-50" />
                    <Textarea
                      id="description"
                      placeholder="Descrição"
                      className="resize-none"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 md:flex-row md:gap-2 ">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'flex gap-2 w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={'4'}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Prioridade 1</SelectItem>
                      <SelectItem value="2">Prioridade 2</SelectItem>
                      <SelectItem value="3">Prioridade 3</SelectItem>
                      <SelectItem value="4">Prioridade 4</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="labelId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Etiqueta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {labelsOptions?.map((label, index) => (
                        <SelectItem key={index} value={label.id}>
                          {label.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <CardFooter className="flex w-full flex-col lg:flex-row lg:justify-between gap-2 border-t-2 pt-3">
            <div className="flex flex-col w-full md:flex-row gap-3 justify-between">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Projeto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectOptions?.map((label, index) => (
                          <SelectItem key={index} value={label.id}>
                            {label.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button
                  className="font-bold"
                  variant={'outline'}
                  onClick={() => setShowAddTask(false)}
                >
                  Cancelar
                </Button>
                <Button className="font-bold">Adicionar tarefa</Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
