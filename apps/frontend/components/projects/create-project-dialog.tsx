'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { CreateProjectForm } from './create-project-form';

export function CreateProjectDialog({
  isOpen,
  setIsCreateProjectDialogOpen,
}: {
  isOpen: boolean;
  setIsCreateProjectDialogOpen: (value: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsCreateProjectDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar projeto</DialogTitle>
        </DialogHeader>
        <CreateProjectForm
          setIsCreateProjectDialogOpen={setIsCreateProjectDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
