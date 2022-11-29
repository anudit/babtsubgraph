import { store } from "@graphprotocol/graph-ts"
import {
  SBT as SBTContract,
  Attest,
  Revoke
} from "../generated/SBT/SBT"
import { SBT } from "../generated/schema";

export function handleAttest(event: Attest): void {
  let entity = SBT.load(event.params.tokenId.toHex());
  if (!entity) {
    entity = new SBT(event.params.tokenId.toHexString());
  }

  entity.owner = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.attestor = event.transaction.from;
  entity.timestamp = event.block.timestamp;
  entity.txnhash = event.transaction.hash;

  let SbtInstance = SBTContract.bind(event.address);
  entity.tokenURI = SbtInstance.tokenURI(event.params.tokenId);

  entity.save()

}

export function handleRevoke(event: Revoke): void {
  let entity = SBT.load(event.params.tokenId.toHex());
  if (!entity) {
    store.remove('SBT', event.params.tokenId.toHex());
  }

}
