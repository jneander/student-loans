// export function provide (App, Store, config = {}) {
//   class ReduxApp extends React.Component {
//     constructor (props) {
//       super(props);

//       this.store = Store.create();
//     }

//     componentWillMount () {
//       this.store.dispatch(Actions.initialize());
//     }

//     render () {
//       return <Provider store={this.store}><App /></Provider>
//     }
//   }

//   return ReduxApp;
// }
