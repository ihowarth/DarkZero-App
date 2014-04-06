exports.getTeam = function() {
    var team = [];
    
    var benK = {
        name           : 'Ben Knowles',
        occupation     : 'Hitman',
        favouriteGames : "Soda Drinker Pro, Spyro 2: Ripto's Rage, Windjammers, Street Fighter: The Movie: The Game",
        bio            : 'Runs a pretty awesome website called DarkZero.co.uk, where he has formed a team of super-human reviewers. Is also a time travelling cyborg who must stop SkyNet at all costs. Hasta la Vista, baby.',
        image          : '/Team/Ben.jpg',
        webpage        : 'https://darkzero.co.uk'
    };
    team.push(benK);

    var domS = {
        name           : 'Dominic Sheard',
        occupation     : 'Energy drink tester',
        favouriteGames : 'lol',
        bio            : "I 'unno",
        image          : '/Team/Dom.jpg',
        webpage        : 'https://twitter.com/Domstercool'
    };
    team.push(domS);

    var ianH = {
        name           : 'Ian Howarth',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Team/Ian.jpg',
        webpage        : 'https://twitter.com/GeekKingCloud'
    };
    team.push(ianH);

    var thomas = {
        name           : 'Thomas',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Team/Thomas.png',
        webpage        : 'https://facebook.com'
    };
    team.push(thomas);

    var nathan = {
        name           : 'Nathan',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Team/Nathan.jpg',
        webpage        : 'https://twitter.com'
    };
    team.push(nathan);
    
    return team;
};