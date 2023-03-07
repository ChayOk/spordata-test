// import React from 'react';
// import axios from 'axios';
// import { TournamentList } from "./TournamentList";


// export class CountryList extends React.Component {
//   state = {
//     countries: [],
//     tournaments: [],
//     events: []
//   }

//   componentDidMount() {
//     axios.get(`http://localhost:8081/api/countries`)
//       .then(res => {
//         const countries = res.data;
//         this.setState({ countries });
//       })

//     axios.get(`http://localhost:8081/api/tournaments`)
//     .then(res => {
//         const events = res.data;
//         this.setState({ events });
//     })
//   }

//   // render() {
//   //   return (
//   //     <>
//   //       { this.state.events.map(event => 
//   //       <div className="countryItem">
//   //         <button className="countryBtn">
//   //           <div>
//   //             {event.country_name}
//   //           </div>
//   //         </button>
//   //         <ul>
//   //           <TournamentList />
//   //         </ul>
//   //       </div>
//   //       )}
//   //     </>
//   //   )
//   // }

//   render() {
//     return (
//       <>
//         { this.state.tournaments.map(tournament => 
//         <div className="countryItem">
//           <button className="countryBtn">
//             <div>
//               if({tournament.country_name})
//               {tournament.country_name}
//             </div>
//           </button>
//           <ul>
//             <TournamentList />
//           </ul>
//         </div>
//         )}
//       </>
//     )
//   }

//   // render() {
//   //   return (
//   //     <>
//   //       { this.state.countries.map(country => 
//   //       <div className="countryItem">
//   //         <button className="countryBtn">
//   //             <div>
//   //               {country.name}

//   //             {/* <TournamentList /> */}
//   //             </div>
//   //         </button>
//   //         <div>
//   //         </div>
//   //       </div>
//   //       )}
//   //     </>
//   //   )
//   // }
// }

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCountries, updateEvents } from '../store/sportsActions';
import  TournamentList  from "./TournamentList";

class CountryList extends React.Component {

    render() {
    return (
      <>
        { Array.isArray(this.props.countries) && this.props.countries.map(country => 
        <div className="countryItem">
          <button className="countryBtn">
            <div>
              {country.name}
            </div>
          </button>
          <ul>
            {/* <TournamentList /> */}
          </ul>
        </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  countries: state.countries,
  // events: state.events
});

const mapDispatchToProps = {
  updateCountries,
  updateEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);