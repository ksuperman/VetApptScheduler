/**
 * Attach and Configure the Error Handler for the express app.
 */
function ErrorHandlerMiddleware() {
    return (app) => {
        app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    };
}

module.exports = ErrorHandlerMiddleware;
