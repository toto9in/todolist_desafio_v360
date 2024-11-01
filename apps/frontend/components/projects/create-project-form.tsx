'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useCreateProject } from '@/resources/hooks/todo.hooks';
import { useQueryClient } from '@tanstack/react-query';

const createProjectFormSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }),
});

export function CreateProjectForm({
  setIsCreateProjectDialogOpen,
}: {
  setIsCreateProjectDialogOpen: (value: boolean) => void;
}) {
  const createProject = useCreateProject();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createProjectFormSchema>>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof createProjectFormSchema>) => {
    await createProject.mutateAsync(data.name).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-projects-for-projects-page'],
      });
      setIsCreateProjectDialogOpen(false);
    });

    form.reset();
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome do Projeto"
                    required
                    className="border-0 font-bold text-lg"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end">
            <Button
              className="font-bold"
              variant="outline"
              onClick={() => setIsCreateProjectDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="font-bold"
              type="submit"
              onClick={() => onSubmit(form.getValues())}
            >
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
