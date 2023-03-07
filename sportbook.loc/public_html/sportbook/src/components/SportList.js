// Первая версия базового отображения компонента
// import React from 'react';
// import axios from 'axios';
// import { CountryList } from "./CountryList";


// export class SportList extends React.Component {
//   state = {
//     sports: [],
//     events: []
//   }

//   componentDidMount() {
//     axios.get(`http://sportbook.loc/?api=sports`)
//     .then(res => {
//         const sports = res.data;
//         this.setState({ sports });
//     })

//     axios.get(`http://localhost:8081/api/events`)
//     .then(res => {
//         const events = res.data;
//         this.setState({ events });
//     })
//   }

//   // render() {
//   //   return (
//   //     <ul>
//   //       { this.state.events.map(event => 
//   //       <li className="sportItem">
//   //           <button className="sportBtn">
//   //               <div>{event.sport_name}</div>
//   //           </button>
//   //           <div>
//   //               <CountryList />
//   //           </div>
//   //       </li>
//   //       )}
//   //     </ul>
//   //   )
//   // }

//   render() {
//     return (
//       <ul>
//         { this.state.sports.map(sport => 
//         <li className="sportItem">
//             <button className="sportBtn">
//                 <div>{sport.name}</div>
//             </button>
//             <div>
//                 {/* <CountryList /> */}
//             </div>
//         </li>
//         )}
//       </ul>
//     )
//   }
// }

/*Работающая версия компонента, с попыткой передать данные через роут*/
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateSports, updateCountries, updateTournaments } from '../store/sportsActions';


const mapStateToProps = (state) => ({
  sports: state.sports,
  countries: state.countries,
  tournaments: state.tournaments,
  // events: state.events,
});

const mapDispatchToProps = {
  updateSports,
  updateCountries,
  updateTournaments,
  // updateEvents
};

class SportList extends React.Component {
  componentDidMount() {
    // axios.get(`http://sportbook.loc/?api=sports`)
    axios.get(`http://localhost:8081/api/sports`)
      .then(res => {
        this.props.updateSports(res.data);
      });

    // axios.get(`http://sportbook.loc/?api=countries`)
    axios.get(`http://localhost:8081/api/countries`)
      .then(res => {
        this.props.updateCountries(res.data);
      });

    // axios.get(`http://sportbook.loc/?api=tournaments`)
    axios.get(`http://localhost:8081/api/tournaments`)
      .then(res => {
        this.props.updateTournaments(res.data);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      expandedSports: {},
      expandedCountries: {},
      selectedTournaments: [], // add initial state for selectedTournaments
    };
  }

  // открыт ли спорт
  handleToggleSport = (sportName) => {
    this.setState(prevState => ({
      expandedSports: {
        ...prevState.expandedSports,
        [sportName]: !prevState.expandedSports[sportName],
      },
    }));
  }

  // открыта ли страна
  handleToggleCountry = (sportName, countryName) => {
    this.setState(prevState => ({
      expandedCountries: {
        ...prevState.expandedCountries,
        [`${sportName}:${countryName}`]: !prevState.expandedCountries[`${sportName}:${countryName}`],
      },
    }));
  }
  handleCheckboxChange = (tournaments, isChecked) => {
    const selectedTournaments = [...this.state.selectedTournaments];
    const index = selectedTournaments.findIndex(selectedTournament => selectedTournament.id === tournaments.tournament_id);
    if (isChecked && index === -1) {
      // Add the tournament to the list of selected tournaments
      selectedTournaments.push(tournaments);
    } else if (!isChecked && index !== -1) {
      // Remove the tournament from the list of selected tournaments
      selectedTournaments.splice(index, 1);
    }
    // Update the component state
    this.setState({ selectedTournaments });
    console.log(tournaments.tournament_id);
    // Navigate to the tournament details page
    // this.props.history.push(`/events/${tournaments.tournament_id}`);
  }

  render() {
  // Object to store tournaments by sport and country
  const tournamentsBySportAndCountry = {};

  // Iterate through each tournament in the props
  Array.isArray(this.props.tournaments) && this.props.tournaments.forEach(tournament => {
    // Check if sport and country are already stored
    if (!tournamentsBySportAndCountry[tournament.sport_name]) {
      tournamentsBySportAndCountry[tournament.sport_name] = {};
    }
    if (!tournamentsBySportAndCountry[tournament.sport_name][tournament.country_name]) {
      tournamentsBySportAndCountry[tournament.sport_name][tournament.country_name] = {};
    }

    // Add tournament to corresponding group
    if (!tournamentsBySportAndCountry[tournament.sport_name][tournament.country_name][tournament.tournament_name]) {
      tournamentsBySportAndCountry[tournament.sport_name][tournament.country_name][tournament.tournament_name] = [];
    }
    tournamentsBySportAndCountry[tournament.sport_name][tournament.country_name][tournament.tournament_name].push(tournament);
  });

  // Render sorted and grouped tournaments
  return (
    <>
      {Object.keys(tournamentsBySportAndCountry).map(sportName => (
        <li className="sportItem" key={sportName}>
          <button className="sportBtn" onClick={() => this.handleToggleSport(sportName)}>
            <div>{sportName}</div>
          </button>
          {this.state.expandedSports[sportName] && Object.keys(tournamentsBySportAndCountry[sportName]).map(countryName => (
            <div className="countryItem" key={`${sportName}:${countryName}`}>
              <button className="countryBtn" onClick={() => this.handleToggleCountry(sportName, countryName)}>
                <div>{countryName}</div>
              </button>
              {this.state.expandedCountries[`${sportName}:${countryName}`] && (
                <ul>
                  {Object.keys(tournamentsBySportAndCountry[sportName][countryName]).map(tournamentName => {
                    const tournamentId = tournamentsBySportAndCountry[sportName][countryName][tournamentName][0].tournament_id;
                    const isChecked = this.state.selectedTournaments.some(tournament => tournament.tournament_id === tournamentId);
                    return (
                      <li key={`${tournamentId}:${tournamentName}`}>
                        <label className='labelBtn'>
                          <span className='tournamentTitle'>
                            {tournamentName}
                          </span>
                          
                          <Link to={`/events/${countryName}/${tournamentId}`}>
                            <input
                            type="checkbox"
                            className="tournamentCheckbox"
                            checked={isChecked}
                            onChange={() => this.handleCheckboxChange({tournament_id: tournamentId}, !isChecked)}
                          />
                          </Link>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </li>
      ))}
    </>
  );
}

}

export default connect(mapStateToProps, mapDispatchToProps)(SportList);


// import React from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { updateSports, updateCountries, updateTournaments } from '../store/sportsActions';

// const mapStateToProps = (state) => ({
//   sports: state.sports,
//   countries: state.countries,
//   tournaments: state.tournaments,
// });

// const mapDispatchToProps = {
//   updateSports,
//   updateCountries,
//   updateTournaments,
// };

// class SportList extends React.Component {
//     componentDidMount() {
//       axios.get(`http://sportbook.loc/?api=sports`)
//         .then(res => {
//           this.props.updateSports(res.data);
//         });
  
//       axios.get(`http://sportbook.loc/?api=countries`)
//         .then(res => {
//           this.props.updateCountries(res.data);
//         });
  
//       axios.get(`http://sportbook.loc/?api=tournaments`)
//         .then(res => {
//           this.props.updateTournaments(res.data);
//         });
//     }
  
//     constructor(props) {
//       super(props);
//       this.state = {
//         expandedSports: {},
//         expandedCountries: {},
//         selectedTournaments: [], // add initial state for selectedTournaments
//       };
//     }
  
//     // открыт ли спорт
//     handleToggleSport = (sportName) => {
//       this.setState(prevState => ({
//         expandedSports: {
//           ...prevState.expandedSports,
//           [sportName]: !prevState.expandedSports[sportName],
//         },
//       }));
//     }
  
//     // открыта ли страна
//     handleToggleCountry = (sportName, countryName) => {
//       this.setState(prevState => ({
//         expandedCountries: {
//           ...prevState.expandedCountries,
//           [`${sportName}:${countryName}`]: !prevState.expandedCountries[`${sportName}:${countryName}`],
//         },
//       }));
//     }
  
//     // Обновляет состояние компонента при изменении чекбокса
//     handleCheckboxChange = (tournaments, isChecked) => {
//       const selectedTournaments = [...this.state.selectedTournaments];
//       const index = selectedTournaments.findIndex(selectedTournament => selectedTournament.id === tournaments.tournament_id);
//       if (isChecked && index === -1) {
//       // Add the tournament to the list of selected tournaments
//       selectedTournaments.push(tournaments);
//       } else if (!isChecked && index !== -1) {
//       // Remove the tournament from the list of selected tournaments
//       selectedTournaments.splice(index, 1);
//       }
//       // Update the component state
//       this.setState({ selectedTournaments });
//       }
      
//       render() {
//       const { sports, countries, tournaments } = this.props;
//       const { expandedSports, expandedCountries, selectedTournaments } = this.state;
//       return (
//         <div className="SportList">
//           {sports.map(sport => {
//             return (
//               <div key={sport.id}>
//                 <div className="SportList-sport" onClick={() => this.handleToggleSport(sport.sport_name)}>
//                   {sport.sport_name}
//                 </div>
//                 {expandedSports[sport.sport_name] && (
//                   <div className="SportList-countries">
//                     {countries.map(country => {
//                       const countryTournaments = tournaments.filter(tournament => tournament.country_id === country.id);
//                       const selectedCountryTournaments = countryTournaments.filter(tournament => selectedTournaments.find(selectedTournament => selectedTournament.id === tournament.id));
//                       const isCountryExpanded = expandedCountries[`${sport.sport_name}:${country.country_name}`];
//                       return (
//                         <div key={country.id}>
//                           <div className="SportList-country" onClick={() => this.handleToggleCountry(sport.sport_name, country.country_name)}>
//                             {country.country_name}
//                           </div>
//                           {isCountryExpanded && (
//                             <div className="SportList-tournaments">
//                               {countryTournaments.map(tournament => {
//                                 const isChecked = selectedTournaments.find(selectedTournament => selectedTournament.id === tournament.id) !== undefined;
//                                 return (
//                                   <div className="SportList-tournament" key={tournament.id}>
//                                     <label>
//                                       <input type="checkbox" checked={isChecked} onChange={(event) => this.handleCheckboxChange(tournament, event.target.checked)} />
//                                       {tournament.tournament_name}
//                                     </label>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           )}
//                           {selectedCountryTournaments.length > 0 && (
//                             <div className="SportList-selected-tournaments">
//                               <div className="SportList-selected-tournaments-title">
//                                 Selected tournaments
//                               </div>
//                               {selectedCountryTournaments.map(tournament => {
//                                 return (
//                                   <div className="SportList-selected-tournament" key={tournament.id}>
//                                     <Link to={`/events/${tournament.id}`}>
//                                       {tournament.tournament_name}
//                                     </Link>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       );
//     }
//   }      

//   export default connect(mapStateToProps, mapDispatchToProps)(SportList); 