import pandas as pd
import numpy as np

def find_joey_indices(joey, kangaroo):
    """
    returns the indicies of the joey word within the kangaroo word
    """
    ixs = []
    kanga = kangaroo
    last_ix = 0
    for k, char in enumerate(joey):
        ix = kanga.index(char)
        if last_ix == 0:
            ixs.append(ix)
            last_ix = last_ix+ix+1
        else:
            ixs.append(ix+last_ix)
            last_ix = ix+last_ix
        if k == len(joey):
            break
        else:
            kanga = kangaroo[last_ix:]
        
        #replace joey indicies with '_' in the kangaroo word
        kangaroo = list(kangaroo)
        for ix in ixs:
            kangaroo[ix] = '_'
        kangaroo = "".join(kangaroo)
    return([ixs, kangaroo])

def append_columns(df):
    """
    takes a dataframe and append two columns, the joey indices in the word, and the unfilled kangaroo word
    """
    def _f(x): 
        return(find_joey_indices(x[0], x[1] ))

    df = pd.merge(
        df,
        pd.DataFrame(df.apply(_f, axis=1)).rename(columns={"joey_word":"joey_indices", "kangaroo_word":"kangaroo_unfilled"}),
        how="left",
        left_index=True,
        right_index=True
    )
    for i in range(df.shape[0]):
        df.loc[i, "kangaroo_unfilled"] = [x for x in df.loc[i, "kangaroo_unfilled"]]
    return(df)

def create_puzzle(puzzle_id, joey_words, kangaroo_words, joey_clues):
    """
    saves a json object of the form puzzle_<id>
    """
    
    df = pd.DataFrame({
        "joey_word":joey_words,
        "kangaroo_word":kangaroo_words
    })

    df = append_columns(df)
    df["joey_clue"] = joey_clues

    letter_bank = [x.upper() for x in "".join(df.joey_word)]
    letter_bank.sort()
    temp = pd.DataFrame({"id":[puzzle_id], "letterbank":[letter_bank], "letterbank_update":[letter_bank]})
    temp["puzzle_rows"] = [df.to_dict(orient="records")]
    return(temp)