type SpinnerProps = {
  loading: boolean;
  color?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ loading, color }) => {
  return (
    loading && (
      <span className={`loading ${color} loading-spinner loading-lg`}></span>
    )
  );
};
