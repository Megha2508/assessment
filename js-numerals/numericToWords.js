function numberToWords(n) {

    var units, tens, scales, start, end, digits, digitsLen, digit, ints, i, word, words, and='and';

    units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
    tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
    scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];

    start = n.length;
    digits = [];
    if(start <= 4){
        while( start > 0 ) {
            end = start;
            digits.push( n.slice( ( start = Math.max( 0, start - 2 ) ), end ) );
        }
    }
    else {
        while( start > 0 ) {
            end = start;
            digits.push( n.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
        }
    }
    
    digitsLen = digits.length;
    if( digitsLen > scales.length ) {
        return '';
    }
    
    words = [];
    if( parseInt( n ) === 0 ) {
        words.push('zero');
    }
    for( i = 0; i < digitsLen; i++ ) {
        digit = parseInt( digits[i] );
        if( digit ) {
            ints = digits[i].split('').reverse().map(parseFloat);
            if( ints[1] === 1 ) {
                ints[0] += 10;
            }
            if( n > 10000 ){
                if( ( word = scales[i] ) ) {
                    words.push( word );
                }
                if( ( word = units[ ints[0] ] ) ) {
                    words.push( word )
                }
                if( ( word = tens[ ints[1] ] ) ) {
                    words.push( word );
                }
            }
            if( n < 10000 ){
                if( ( word = units[ ints[0] ] ) ) {
                    ints[0] > 10 && ints[0] < 20 ? words.push(word + ' hundred and') : words.push( word );
                }
                if (ints[0] == 0){
                    words.push( scales[i] +' '+ and );
                    if( ( word = units[ ints[1] ] ) ) {
                        words.push( word );
                    }
                }
                else {
                    word = tens[ ints[1] ]
                    words.push( word );
                }
            }
            if( ints[1] ){
                if( ints[2] || (i + 1) > digitsLen ) {
                    words.push( and );
                }
            }
            if( ints[2] ) {
                if( ( word = units [ ints[2] ] ) )
                    words.push( word + ' hundred' );
            }
        } 
    }        
    return document.getElementById("phrase").innerHTML=words.reverse().join(' ');    
}