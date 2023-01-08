const NotFound = ({onNotFound}) => {
    return(
        <div className='no-results'>
            <h1>No results :(</h1>
            <input type="button" defaultValue="Вернуться на главную" onClick={() => onNotFound()} />
        </div>
    )
}

export default NotFound