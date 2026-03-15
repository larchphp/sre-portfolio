import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function AnimatedCounter({ end, decimals = 0, prefix = '', suffix = '', duration = 2 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp end={end} decimals={decimals} prefix={prefix} suffix={suffix} duration={duration} />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  )
}
