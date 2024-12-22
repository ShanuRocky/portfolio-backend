import yahooFinance from 'yahoo-finance2';

export const getCurrentPrices = async (tickers) => {
  try {
    const quotes = await Promise.all(
      tickers.map(ticker => yahooFinance.quote(ticker))
    );
    return quotes.reduce((acc, quote) => {
      acc[quote.symbol] = quote.regularMarketPrice;
      return acc;
    }, {});
  } catch (error) {
    console.error('Failed to fetch stock prices:', error);
    
    return {};
  }
}

export const searchSymbols = async (query) => {
  try {
    const results = await yahooFinance.search(query);
    return results.quotes
      .filter(quote => quote.quoteType === 'EQUITY')
      .map(quote => ({
        symbol: quote.symbol,
        name: quote.shortname || quote.longname
      }));
  } catch (error) {
    console.error('Failed to search symbols:', error);
    return [];
  }
}
