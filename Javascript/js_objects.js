let students = [
    { name: 'Remy', cohort: 'Jan' },
    { name: 'Genevieve', cohort: 'March' },
    { name: 'Chuck', cohort: 'Jan' },
    { name: 'Osmund', cohort: 'June' },
    { name: 'Nikki', cohort: 'June' },
    { name: 'Boris', cohort: 'June' }
];
for(let i=0;i<students.length;i++){
    console.log(`Name: ${students[i].name}, Cohort: ${students[i].cohort}`);
}

let users = {
    employees: [
        { 'first_name': 'Miguel', 'last_name': 'Jones' },
        { 'first_name': 'Ernie', 'last_name': 'Bertson' },
        { 'first_name': 'Nora', 'last_name': 'Lu' },
        { 'first_name': 'Sally', 'last_name': 'Barkyoumb' }
    ],
    managers: [
        { 'first_name': 'Lillian', 'last_name': 'Chambers' },
        { 'first_name': 'Gordon', 'last_name': 'Poe' }
    ]
};
//EMPLOYEES
//1 - JONES, MIGUEL - 11
for(let status in users){
    for (let i = 0; i < users[status].length; i++) {
        console.log(`${i + 1} - ${users[status][i].last_name}, ${users[status][i].first_name} - ${users[status][i].last_name.length + users[status][i].first_name.length}`);
    }
}