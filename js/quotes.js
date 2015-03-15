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
			text: 'The best way to live life a full life is to be a child, no matter what your age.',
			source: 'Gintama'
		}
	];

	function randomQuote(quotes) {
		var index =  Math.round(Math.random() * (quotes.length - 1));
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