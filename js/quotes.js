(function() {

	var quote, allQuotes
	var allQuotes = [
		{
			text: 'Remind yourself that overconfidence is a slow and insidious killer.', 
			source: 'Darkest Dungeon'
		},
		{
			text: 'Be fearful when others are greedy and greedy when others are fearful.', 
			source: 'Warren Buffet'
		},
		{
			text: 'The best way to live a full life is to be a child, no matter what your age.',
			source: 'Gintama'
		},
		{
			text: "If you have time to think of a beautiful ending, why not use the time to live beautifully until the end.",
			source: 'Gintama'
		},
		{
			text: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
			source: 'Bernard Baruch'
		},
		{
			text: "You only live once, but if you do it right, once is enough.",
			source: 'Mae West'
		},
		{
			text: "If you tell the truth, you don't have to remember anything.",
			source: 'Mark Twain'
		},
		{
			text: "It is better to be hated for what you are than to be loved for what you are not.",
			source: "Autumn Leaves"
		},
		{
			text: "I have not failed. I've just found 10,000 ways that won't work.",
			source: "Thomas Edison"
		},
		{
			text: "Life is like riding a bicycle. To keep your balance, you must keep moving."
			source: "Albert Einstein"
		},
		{
			text: "Anyone who has never made a mistake has never tried anything new.",
			source: "Albert Einstein"
		},
		{
			text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
			source: "Albert Einstein"
		}
	];

	function randomQuote(quotes) {
		var index = Math.round(Math.random() * (quotes.length - 1));
		return quotes[index];
	}

	quote = randomQuote(allQuotes);

	$(document).ready(function() {
		$('.quotes .text').text('"' + quote.text + '"');
		if (quote.source) {
			$('.quotes .source').text('- ' + quote.source);
		}
	});
})();