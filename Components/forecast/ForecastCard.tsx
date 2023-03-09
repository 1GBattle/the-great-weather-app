import styles from '@/styles/ForecastCard.module.css'
import Image from 'next/image'

interface Props {
	icon: string
}

export default function ForecastCard({ icon }: Props) {
	return (
		<div className={styles.wrapper}>
			<div className={`${styles.cardContainer}`}>
				<div className={`${styles.cardContent} flex-column`}>
					<div className='flex-column'>
						<div className={styles.cityContent}></div>

						<div className={`${styles.weatherImg} flex-center`}>
							<Image src={icon} alt='weather icon' width={56} height={56} priority />
						</div>
					</div>
					<div className={styles.conditionContainer}></div>
				</div>
			</div>
		</div>
	)
}
