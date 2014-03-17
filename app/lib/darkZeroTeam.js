exports.getTeam = function() {
    var team = [];
    
    var benK = {
        name           : 'Ben Knowles',
        occupation     : 'Hitman',
        favouriteGames : "Soda Drinker Pro, Spyro 2: Ripto's Rage, Windjammers, Street Fighter: The Movie: The Game",
        bio            : 'Runs a pretty awesome website called DarkZero.co.uk, where he has formed a team of super-human reviewers. Is also a time travelling cyborg who must stop SkyNet at all costs. Hasta la Vista, baby.',
        image          : '/Settings.png'
    };
    team.push(benK);

    var domS = {
        name           : 'Dominic Sheard',
        occupation     : 'Energy drink tester',
        favouriteGames : 'lol',
        bio            : "I 'unno",
        image          : '/Information.png'
    };
    team.push(domS);

    var ianH = {
        name           : 'Ian Howarth',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Settings.png'
    };
    team.push(ianH);

    var thomas = {
        name           : 'Thomas',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Settings.png'
    };
    team.push(thomas);

    var simon = {
        name           : 'Simon',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Settings.png'
    };
    team.push(simon);
    
    return team;
};
