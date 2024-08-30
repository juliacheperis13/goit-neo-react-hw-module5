import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>Something went wrong</p>
    </div>
  );
};

export default ErrorMessage;
