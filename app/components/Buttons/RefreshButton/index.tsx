import { RefreshIcon } from '@/components/Icon';
interface RefreshButtonProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const RefreshButton = ({ className, onClick }: RefreshButtonProps) => {
  return (
    <div className={className} onClick={onClick}>
      <RefreshIcon />
    </div>
  );
};

export default RefreshButton;
