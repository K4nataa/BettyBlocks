// (() => ({
//     name: 'Organogram',
//     type: 'BODY_COMPONENT',
//     allowedTypes: [],
//     orientation: 'HORIZONTAL',
//     jsx: (() => {
//       const { env, Query, useAllQuery, useFilter } = B;
//       const { model, filter, displayError } = options;
//       const where = useFilter(filter);
//       const { gql } = window.MaterialUI;
//       const isDev = env === 'dev';
//       const GET_USERINFO = gql`
//       query Item {
//         allTeambridge {
//           results {
//             id
//             childTeam {
//               id
//               name
//               hierarchyLevel
//               hideChildren
//                 webuserteams {
//                 webuser {
//                   firstName
//                   lastName
//                 }
//               }
//             }
//             parentTeam {
//               id
//               name
//               hierarchyLevel
//               hideChildren
//             }
//           }
//         }
//       }    
      
//       `;
  
//       //Creates the icon, link and name for the Card.
//       const TeamList = props => {
//         const { teammembers } = props;
//         if (teammembers.length > 0) {
//           return (
//             <>
//               {teammembers.map(user => (
//                 <>
//                   <div className={classes.employee}>
//                     <div className={classes.employee_img}>
//                       <img
//                         src="https://placekitten.com/1000/500"
//                         className={classes.profile_pic}
//                         alt="Betty Logo"
//                       />
//                     </div>
//                     <p>
//                       {user ? user.firstName +
//                           ' ' +
//                           user.lastName
//                         : ''}
//                     </p>
//                   </div>
//                 </>
//               ))}
//             </>
//           );
//         }
//         return <p>-</p>;
//       };
   
//       //Creates the card itself and uses the TeamList to fill in the information.
//       const Card = props => {
//         debugger;
//         const { sector, visibility } = props;
//         //const [state, setState] = React.useState(true);
//         const [ childVisibility, setChildVisibility ] = React.useState(true);
//         const setVisibility = (value) => {
//           setChildVisibility(!value)
//         }
//         const t   = this;
//         const toggleCard = props => {  
//           sector.forEach((item) => {
//             //Loop through sector, if sector.childName === clicked parentName, hide sector.childArray
//             if(item.childName === props.childName) {
//               console.log("Dit klopt 100% no cap")
//               setChildVisibility(visibility => !visibility);
//             }
//             else {console.log("Ja hier klopt geen reet vsan");}
  
//           });
//           console.log("My props contains: ", props.childName);
//           //setChildVisibility(visibility => !visibility);
//         };
    
//         if (sector) {
//           return (
//             <>
//               <ul>
//                 {sector.map(teamBridge => (
//                   <>
//                     <li key={teamBridge.id}>
//                       <span>
//                         <div>
//                           <h4>{teamBridge.childName}</h4>
//                           <h3>{visibility ? "Hallo": "Doei"}</h3> 
//                           <i className="fas fa-chevron-up">
//                             <button onClick={() => toggleCard(teamBridge)} >{childVisibility ? "▼" : "▲"}</button>
//                           </i>
//                         </div>
//                         <hr />
//                         <div className={classes.employee_list}>
//                           <a href="google.com">
//                             {teamBridge.childWebusers?.length && (
//                               <TeamList teammembers={teamBridge.childWebusers} />
//                             )}
//                           </a>
//                         </div>
//                       </span>
//                       { childVisibility ? teamBridge.childArray?.length > 1 ? <Card sector={teamBridge.childArray} visibility={childVisibility}/> : "" : null}
//                     </li>
//                   </>
//                 ))}
//               </ul>
//             </>
//           );
//         }
//         return <> </>;
//       };
  
//       function SortJSON(data, filter) {
//         const teams = [];
//         const jsonObj = []; 
  
//         data.allTeambridge.results.forEach((newTeam)  => {
//           var teamObject = {
//             id: newTeam.id,
//             childId: newTeam.childTeam?.id,
//             childName: newTeam.childTeam?.name,
//             parentName: newTeam.parentTeam?.name,
//             childHierarchyLevel: newTeam.childTeam?.hierarchyLevel,
//             hideChildren: newTeam.childTeam?.hideChildren,
//             childWebusers: newTeam.childTeam?.webuserteams.map(x => x.webuser),
//             childArray: [],
//           };
//           // You now have a single dimension array of individual objects.
//           teams.push(teamObject);
//         });
        
//         teams.forEach((secondteam) => {
//           if(secondteam.parentName) {
//             if(teams.find(x => x.childName === secondteam.parentName && secondteam.parentName !== secondteam.childName)) {
//               const parentObj = teams.find(x => x.childName === secondteam.parentName);
//               parentObj.childArray.push(secondteam); 
//             }
//           }
//           if (parentObj) {
//             jsonObj.push(parentObj);
//           }
//         });
        
//         //const Seen is an Array
//         const uniqueObj = new Set();
//         const result = jsonObj.filter(
//           (el) => {
//             if (el.childHierarchyLevel === 0) { 
//               // add the id to the set
//               // check if the set has the id
//               // if has return true it means its not unique so you want to filter it, if the has return false it means its unique and you return true to keep it in the array
//               const duplicate = uniqueObj.has(el.id); 
//               uniqueObj.add(el.id)
//               return !duplicate
//             } else {
//               return false
//             }
//           }
//         );
//         //This is your filter for later :ThumbsUp:
//         //console.log("My jsonObj contains: ", result.filter(x => x.childName === "Product"));
//         console.log("My jsonObj contains: ", result);
//         return result.filter(x => x.childName === filter);
  
//       }
    
  
//       //Creates a card that recursively loops through all cards using a GraphQL query.
//       //TODO: Make use of the Betty DataModel.
//       function LoadCards() {
//         return (
//           <Query fetchPolicy="network-only" query={GET_USERINFO}>
//             {({ loading, error, data }) => {
//               if (loading) {
//                 return 'Loading...';
//               }
//               if (error) {
//                 return `Error! ${error.Message}`;
//               }
  
//               var result = SortJSON(data, "CEO/VP");
//               return (
//                 <div className={classes.org_tree}>
//                   <Card sector={result} />
//                 </div>
//               );
//             }}
//           </Query>
//         );
//       }
  
//       if (isDev) {
//         return (
//           <div className={classes.org_tree}>
//             <ul>
//               <li>
//                 <span>
//                 <div>
//                   <h4>model.childName</h4>
//                   <i className="fas fa-chevron-up">
//                     <button>▲</button>
//                   </i>
//                 </div>
//                 <hr />
//                 <div className={classes.employee}>
//                     <div className={classes.employee_img}>
//                       <img
//                         src="https://placekitten.com/1000/500"
//                         className={classes.profile_pic}
//                         alt="Betty Logo"
//                       />
//                     </div>
//                     <p>
//                       user.Fullname
//                     </p>
//                   </div>
//                 </span>
//               </li>
//               <li>
//                 <span>
//                 <div>
//                   <h4>model.childName</h4>
//                   <i className="fas fa-chevron-up">
//                     <button>▲</button>
//                   </i>
//                 </div>
//                 <hr />
//                 <div className={classes.employee}>
//                     <div className={classes.employee_img}>
//                       <img
//                         src="https://placekitten.com/1000/500"
//                         className={classes.profile_pic}
//                         alt="Betty Logo"
//                       />
//                     </div>
//                     <p>
//                       user.Fullname
//                       </p>
//                   </div>
//                   <div className={classes.employee}>
//                     <div className={classes.employee_img}>
//                       <img
//                         src="https://placekitten.com/1000/500"
//                         className={classes.profile_pic}
//                         alt="Betty Logo"
//                       />
//                     </div>
//                     <p>
//                       user.Fullname
//                       </p>
//                   </div>
//                 </span>
//               </li>
//             </ul>
//           </div>
//         );
//       }
  
//       return LoadCards();
//     })(),
//     styles: () => () => ({
//       body: {
//         paddingLeft: '10px',
//         fontFamily: '"Ubuntu", sans-serif',
//       },
//       '*': {
//         margin: '0',
//         padding: '0',
//       },
//       a: {
//         textDecoration: 'none',
//         color: 'rgb(0, 0, 0)',
//       },
//       org_tree: {
//         display: 'flex',
//         justifyContent: 'center',
//         paddingTop: '10px',
  
//         '& ul': {
//           position: 'relative',
//           padding: '1em 0',
//           margin: '0 auto',
//           textAlign: 'center',
//         },
//         '& ul:first-child': {
//           overflow: 'auto',
//         },
  
//         '& ul::after': {
//           content: '""',
//           display: 'table',
//           clear: 'both',
//         },
  
//         '& li': {
//           display: 'inline-block',
//           verticalAlign: 'top',
//           textAlign: 'center',
//           listStyleType: 'none',
//           position: 'relative',
//           padding: '1em 0.5em 0 0.5em',
//         },
//         '& li::before, & li::after': {
//           content: '""',
//           position: 'absolute',
//           top: '0',
//           right: '50%',
//           borderTop: '1px solid #ccc',
//           width: '50%',
//           height: '16px',
//         },
//         '& li::after': {
//           right: 'auto',
//           left: '50%',
//           borderLeft: '1px solid #ccc',
//         },
//         '& li:only-child::after, & li:only-child::before': {
//           display: 'none',
//         },
//         '& li:only-child': {
//           padding: '0',
//         },
//         '& li:only-child span': {
//           top: '0',
//         },
//         '& li:first-child::before, & li:last-child::after': {
//           border: '0 none',
//         },
//         '& li:last-child::before': {
//           borderRight: '1px solid #ccc',
//           borderRadius: '0 5px 0 0',
//         },
//         '& li:first-child::after': {
//           borderRadius: '5px 0 0 0',
//         },
//         '& li span:not(:last-child) div:first-child': {
//           cursor: 'pointer',
//         },
//         '& ul ul::before': {
//           content: '""',
//           position: 'absolute',
//           top: '0',
//           left: '50%',
//           borderLeft: '1px solid #ccc',
//           width: '0',
//           height: '1em',
//         },
//         '& li span': {
//           border: '1px solid #ccc',
//           padding: '0.5em 0.75em',
//           textDecoration: 'none',
//           display: 'inline-block',
//           borderRadius: '5px',
//           color: '#333',
//           position: 'relative',
//           top: '1px',
//           whiteSpace: 'normal',
//           cursor: 'default',
//           boxShadow: '0px 0px 3px 1px #e5e5e5',
//           zIndex: '2',
//           background: '#fff',
//         },
//         '& li span:hover, & li span:hover + ul li span': {
//           background: '#e5104d',
//           color: '#fff',
//           border: '1px solid #e5104d',
//         },
//         '& li span:hover a div': {
//           color: '#fff',
//         },
//         '& li span:hover + ul li span a div, & li span:hover p': {
//           color: '#fff',
//         },
//         '& li span:hover + ul li span hr, & li span:hover hr': {
//           borderColor: '#fff',
//         },
//         '& li span:hover + ul li::after, & li span:hover + ul li::before, & li span:hover + ul::before, & li span:hover + ul ul::before': {
//           borderColor: '#e5104d',
//         },
//         '& li span h4': {
//           fontSize: '14px',
//           margin: '0',
//           padding: '0.5em 0',
//         },
//       },
  
//       profile_pic: {
//         width: '35px',
//         height: '35px',
//         flexShrink: '0',
//         objectFit: 'cover',
//         borderRadius: '50%',
//       },
//       employee: {
//         display: 'flex',
//         alignItems: 'center',
//         fontSize: '12px',
//         marginBottom: '2px',
//       },
//       employee_img: {
//         borderRadius: '50%',
//         position: 'relative',
  
//         '&::after': {
//           position: 'absolute',
//           left: '0',
//           top: '0',
//           right: '0',
//           bottom: '0',
//           content: '""',
//           boxShadow: 'inset 0 0 0 2px #fff, 0px 0px 2px 0px #999',
//           borderRadius: '50%',
//         },
//       },
  
//       img: {
//         verticalAlign: 'middle',
//         borderStyle: 'none',
//       },
//       employee_list: {
//         padding: '0.5em 0 0 0.4em',
//       },
//     }),
//   }))();
  