import styles from './aside.module.css'

export const Aside = () => {
    return (<aside className={styles.aside}>
        <img src="/logo.webp"
         alt="Logo do Estacionamento" 
         className={`${styles.logoNav}`} />
    </aside>)
}
