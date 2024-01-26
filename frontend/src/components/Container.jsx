const Container = (props) => {
    return (
        <section className={`${props.className}`}>
            <div className={`max-w-7xl mx-auto px-5`}>
                {props.children}
            </div>
        </section>
    )
}

export default Container