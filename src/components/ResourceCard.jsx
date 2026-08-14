function ResourceCard({ resource }) {
    return (
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-card">
            <span className="resource-type">
                {resource.type === 'video' ? '▶ Video' : '📄 Docs'}
            </span>
            <span className="resource-label">{resource.label}</span>
        </a>
    )
}

export default ResourceCard