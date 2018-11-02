class IdentityMap
{

    constructor()
    {
        var ItemList = new ArrayList;
        
    }


    putData( item)
    {
       ItemList.add(item)
    }

    

    find(item)
    {
        return ItemList.contains(item)
    }

    empty()
    {
        ItemList.clear();
    }

}