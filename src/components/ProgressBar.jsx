function ProgressBar({ completed, total }) {
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

    return (
        <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress__track">
                <div className="progress__fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="progress__label">{completed}/{total} stops · {pct}%</span>
        </div>
    )
}

export default ProgressBar
