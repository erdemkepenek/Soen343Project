// for BookMapper
  bookAdd(userId, item, confirmation) {
    this.BookMapper.addItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  bookModify(userId, item, confirmation) {
    this.BookMapper.modifyItem(userId, item);
    confirmation({ status: "true", message: "no message" });
  }

  bookDelete(userId, itemId, confirmation) {
    this.BookMapper.deleteItem(userId, itemId);
    confirmation({ status: "true", message: "no message" });
  }

  bookView(confirmation) {
    this.BookMapper.viewItems(function(msg){
      confirmation(msg);
    })
  }

  bookUncommitedWork(userId, confirmation) {
    this.BookMapper.viewUncommittedWork(userId,function(msg){
      confirmation(msg);
    });
    
  }

  bookCommit(userId, confirmation) {
    this.BookMapper.commit(userId, function(g_msg) {
      confirmation(g_msg);
    });
  }