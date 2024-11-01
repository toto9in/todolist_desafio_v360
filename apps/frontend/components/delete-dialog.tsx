import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export function DeleteDialog({
  title,
  description,
  isOpen,
  setIsOpen,
  deleteFunction,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  deleteFunction: () => void;
}) {
  const handleDelete = () => {
    deleteFunction();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="font-bold">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 justify-end">
          <Button
            className="font-bold"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button className="font-bold" onClick={() => handleDelete()}>
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
