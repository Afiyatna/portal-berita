import { Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {
    // Cegah crash: pastikan meta dan meta.links valid
    if (!meta || !Array.isArray(meta.links) || meta.links.length === 0) {
        return null; // Atau tampilkan teks: return <p>No pagination</p>
    }

    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div className="btn-group">
            {prev && <Link href={prev} className="btn btn-outline">«</Link>}
            <Link className="btn">{current}</Link>
            {next && <Link href={next} className="btn btn-outline">»</Link>}
        </div>
    )
}

export default Paginator