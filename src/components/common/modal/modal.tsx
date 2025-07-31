import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClassName?: string;
}

const Modal: React.FC<IProps> = ({
  trigger,
  children,
  title,
  className,
  headerClassName,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{trigger}</div>
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader className={headerClassName}>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
