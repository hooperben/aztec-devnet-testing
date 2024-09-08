contract ActualAztecContract {
  use dep::aztec::prelude::{AztecAddress, PublicMutable};

  #[aztec(storage)]
  struct Storage {
      admin: PublicMutable<AztecAddress>, // admin can end vote
  }

  #[aztec(public)]
  #[aztec(initializer)] // annotation to mark function as a constructor
  fn constructor(admin: AztecAddress) {
      storage.admin.write(admin);
  }
}