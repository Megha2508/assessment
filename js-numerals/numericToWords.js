// - - - - - Business Logic - - - - - -
function numberToWords(number) {

    var units, tens, scales, start, end, digits, digitsLen, digit, ints, i, word, words, and='and';

    units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
    tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
    scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];

    start = number.length;
    digits = [];
    if(start <= 4){
        while( start > 0 ) {
            end = start;
            digits.push( number.slice( ( start = Math.max( 0, start - 2 ) ), end ) );
        }
    }
    else {
        while( start > 0 ) {
            end = start;
            digits.push( number.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
        }
    }
    
    digitsLen = digits.length;
    if( digitsLen > scales.length ) {
        return '';
    }
    
    words = [];
    if( parseInt( number ) === 0 ) {
        words.push('zero');
    }
    for( i = 0; i < digitsLen; i++ ) {
        digit = parseInt( digits[i] );
        if( digit ) {
            ints = digits[i].split('').reverse().map(parseFloat);
            if( ints[1] === 1 ) {
                ints[0] += 10;
            }
            if( number > 10000 ){
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
            if( number < 10000 ){
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
    return words.reverse().join(' ');    
}

// - - - - - Show on browser - - - - - -
function display(id){
    if(id=="convert"){
        document.getElementById("phrase").innerHTML=(numberToWords(document.getElementById("number").value))
    }
    if(id=="test"){
        var arr = [7,42,2001,1999,342251,1300420]
        document.getElementById("testCase").innerHTML=(arr.map(i => test(i.toString())).join("<br />"))
    }
}


// - - - - - Tests - - - - - -
function test(n) {
    return n + " = = = " + numberToWords(n);
}