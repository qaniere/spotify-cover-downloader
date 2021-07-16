MicroModal.init();

class Title extends React.Component {

    render() {
        return <h1>Spotify Cover Downloader</h1>;
    };
};

class Modal extends React.Component {

    
    constructor(props) {

        super(props);
        if(localStorage.getItem(this.props.id) === null) {
            this.state = {
                alreadyDisplayed: false,
            };
        } else {
            this.state = JSON.parse(localStorage.getItem(this.props.id));
        };
    };

    componentDidMount() {

        if(this.props.showAtMount && this.state.alreadyDisplayed == false) {

            MicroModal.show(this.props.id);
            if(this.props.showOnce == true) {
                this.setState({
                    alreadyDisplayed: true
                });
            };
        };
    };

    close() {
        MicroModal.close(this.props.id);
    };

    componentDidUpdate() {
        localStorage.setItem(this.props.id, JSON.stringify(this.state));
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

Modal.defautProps = {
    showAtMount: false,
    showOnce: false
};


ReactDOM.render(<>
    <Title/>
    <Modal id="welcome-modal" title="Welcome !" buttonText="Start" showAtMount={true} showOnce={true}>
        This application allows you to download album covers from Spotify. To start, go 
        to the spotify web player "open.spotify.com", select an album or a song, paste the url 
        in the input zone and press download. For further help, click on "configuration" button.
    </Modal>
    </>, 
document.getElementById("root"));
