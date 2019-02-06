var advices = [{
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-1",
        "Created_On": "01/01/2019",
        "Main_Concern": "Physical Abuse",
        "Sub-concerns": {
            "Sub-concern-1": "With implement",
            "Sub-concern-2": "Siblings at risk"
        },
        "Risk": "High",
        "Referral": "Y",
        "Type_of_Referral": "with consent",
        "Person": "None",
        "Contact_Method": "Chat"
    },
    {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-345",
        "Created_On": "01/01/2019",
        "Main_Concern": "Sexual Abuse",
        "Sub-concerns": {
            "Sub-concern-1": "Parent",
            "Sub-concern-2": "Non-contact"
        },
        "Risk": "Medium",
        "Referral": "N",
        "Type_of_Referral": "N/a",
        "Person": "N/a",
        "Contact_Method": "Chat"
    },
    {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-347",
        "Created_On": "01/01/2019",
        "Main_Concern": "Sexual Abuse",
        "Sub-concerns": {
            "Sub-concern-1": "Parent",
            "Sub-concern-2": "Non-contact"
        },
        "Risk": "High",
        "Referral": "Y",
        "Type_of_Referral": "CEOP",
        "Person": "Barry Barryson",
        "Contact_Method": "PIB"
    }, {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-667",
        "Created_On": "02/01/2019",
        "Main_Concern": "Bullying - Online",
        "Sub-concerns": {
            "Sub-concern-1": "Peers",
            "Sub-concern-2": "Non-contact"
        },
        "Risk": "Low",
        "Referral": "N",
        "Type_of_Referral": "N/a",
        "Person": "N/a",
        "Contact_Method": "Voice"
    }, {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-1095",
        "Created_On": "09/01/2019",
        "Main_Concern": "Sexual Abuse",
        "Sub-concerns": {
            "Sub-concern-1": "Parent",
            "Sub-concern-2": "Non-contact"
        },
        "Risk": "Medium",
        "Referral": "N",
        "Type_of_Referral": "N/a",
        "Person": "N/a",
        "Contact_Method": "Chat"
    }, {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-1245",
        "Created_On": "09/01/2019",
        "Main_Concern": "Sexual Abuse",
        "Sub-concerns": {
            "Sub-concern-1": "Position of Trust",
            "Sub-concern-2": "Contact"
        },
        "Risk": "High",
        "Referral": "Y",
        "Type_of_Referral": "Breach",
        "Person": "Barry Barryson",
        "Contact_Method": "Voice"
    }, {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-1789",
        "Created_On": "10/01/2019",
        "Main_Concern": "Emotional Abuse",
        "Sub-concerns": {
            "Sub-concern-1": "Swearing",
            "Sub-concern-2": "Threats of Harm"
        },
        "Risk": "Medium",
        "Referral": "N",
        "Type_of_Referral": "N/a",
        "Person": "N/a",
        "Contact_Method": "Manual"
    }, {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-1791",
        "Created_On": "10/01/2019",
        "Main_Concern": "Sexual Abuse",
        "Sub-concerns": {
            "Sub-concern-1": "Parent",
            "Sub-concern-2": "Non-contact"
        },
        "Risk": "High",
        "Referral": "Y",
        "Type_of_Referral": "With Consent",
        "Person": "Bobby Robson",
        "Contact_Method": "Chat"
    }, {
        "Childline_Account": "Max_Headroom",
        "py3_name": "A-2012",
        "Created_On": "11/01/2019",
        "Main_Concern": "Neglect",
        "Sub-concerns": {
            "Sub-concern-1": "Unemployment",
            "Sub-concern-2": "Parental Alcohol misuse"
        },
        "Risk": "Low",
        "Referral": "N",
        "Type_of_Referral": "N/a",
        "Person": "N/a",
        "Contact_Method": "PIB"
    }
];

var childlineAccount = [{
    "py3_name": "Max_Headroom",
    "id": "C-445678",
    "Created_On": "01/01/2019",
}]

var person = [{
    "py3_name": "Barry Barryson",
    "py3_personId": "P-66788",
    "Created_On": "01/01/2019",
    "Address Name": null,
    "Address Line 1": "36, Thorpe Street",
    "Address Line 2": "null",
    "Town/City": "Manchester",
    "Postcode": "M16 9PR",
}, {
    "py3_name": "Bobby Robson",
    "py3_personId": "P-16235236723",
    "Created_On": "10/01/2019",
    "Address Name": null,
    "Address Line 1": "36, Thorpe Street",
    "Address Line 2": "null",
    "Town/City": "MaAnchester",
    "Postcode": "M16 9PR",
}]



//counting functions
/*aims 
1) show bar chart with (from one Account) the Risk of each contact from each day, in a stacked bar
2) show bar chart with (from one Account) the Main Concern of each contact from each day, in a stacked bar

1) will need
- JSON of advices to be interpreted into dates, and risks - so for each day, how many of each risk were there
- so need to group each object by date - all from 1/1/19 go into one array - filter the array
- the from each array, extract the risks, into another array of risks/dates
- from this array, you can work out the height values for each bar that will be stacked into the date bar
*/

// Javascript date parsing assumings MM/DD/YYYY formats, so we have to make our own parser
// Easier with Moment.js but respecting wish to avoid libraries
function toDate(dateString) {
    const dateParts = dateString.split("/");
    // Months are zero indexed so we need to subtract 1
    // Warning this will throw an exception if insufficently many '/'s were found
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};

// WARNING this function assumes the input is sorted by date
function groupRisksByDate(sortedEntries) {
    // We do this first check since the algorithm that will follow breaks in the case of an empty input
    if (sortedEntries.length === 0) {
        return [];
    };

    let output = [];
    let currentGroup = {Created_On: sortedEntries[0].Created_On, High: 0, Medium: 0, Low: 0}; // This will be an outputgroup
    for (let i = 0; i < sortedEntries.length; i++) {
        let currentItem = sortedEntries[i];
        if (currentGroup.Created_On === currentItem.Created_On) { // if the current group matches the current item...
            currentGroup[currentItem.Risk]++; // then it's risk level is incremented on the currentGroup
        } else {
            output.push(currentGroup); // if not, then the current group is finished and can be pushed to the output
            currentGroup = { // meanwhile the current item starts a new group
                Created_On: currentItem.Created_On,
                High: +(currentItem.Risk === 'High'), // This is a dumb trick to convert a boolean to 0 or 1 (false -> 0, true -> 1)
                Medium: +(currentItem.Risk === 'Medium'),
                Low: +(currentItem.Risk === 'Low')};
        };
    };
    output.push(currentGroup); // There'll be a last group that wasn't pushed already
    return output;
};

advices.sort((a, b) => {
    return toDate(a.Created_On) - toDate(b.Created_On);
});

console.log(groupRisksByDate(advices));
