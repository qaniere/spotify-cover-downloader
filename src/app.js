MicroModal.init();

class Title extends React.Component {

    render() {
        return <h1>Spotify Cover Downloader</h1>;
    };
};

class Modal extends React.Component {

    componentDidMount() {
        MicroModal.show(this.props.id);
    };

    close() {
        MicroModal.close(this.props.id);
    };

    render() {
        return <div className="modal micromodal-slide" id={this.props.id} aria-hidden="true">
        <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
          <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
            <header className="modal__header">
              <h2 className="modal__title" id="modal-1-title">{this.props.title}</h2>
            </header>
            <main className="modal__content" id="modal-1-content">
                {this.props.children}
            </main>
            <footer className="modal__footer">
                <button className="modal__btn modal__btn-primary" onClick={this.close.bind(this)}>
                    {this.props.buttonText}
                </button>
            </footer>
          </div>
        </div>
    </div>
    }; 
};


ReactDOM.render(<>
    <Title/>
    <Modal id="welcome-modal" title="Hello There !" buttonText="Got it !">
        Work in progress...
    </Modal>
    </>, 
document.getElementById("root"));
